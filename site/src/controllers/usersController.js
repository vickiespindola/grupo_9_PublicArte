const {
   validationResult
} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const {
   Console
} = require('console');
const sequelize = db.sequelize;

module.exports = {

   register: function (req, res) {

      res.render('user/register');

   },

   processRegister: function (req, res, next) {

      const errors = validationResult(req);
      const {
         nombre,
         apellido,
         email,
         password
      } = req.body

      if (errors.isEmpty()) {

         /* if (req.fileValidationError) {
            let image = {
               param: 'avatar',
               msg: req.fileValidationError,
            }
            errors.errors.push(image)
         } */

         /* let img = req.files[0].filename; */

         db.Users.create({
               name: nombre.trim(),
               last_name: apellido.trim(),
               email: email.trim(),
               password: bcryptjs.hashSync(password.trim(), 10),
               avatar: req.file ? req.file.filename : 'default-image.png',
               rolesId: 3
            })
            .then(usuario => {
               req.session.userLogged = {
                  id: usuario.id,
                  nombre: usuario.name,
                  apellido: usuario.last_name,
                  email: usuario.email,
                  role: usuario.rolesId,
                  avatar: usuario.avatar
               }
               return res.redirect('/users/profile');
            })
            .catch(error => {
               res.render(error)
            })
      } else {
         res.render('user/register', {
            errors: errors.mapped(),
            old: req.body
         })
      }

   },

   login: function (req, res) {
      res.render('user/login');
   },

   processLogin: function (req, res) {

      const errors = validationResult(req)

      const {
         email
      } = req.body

      if (errors.isEmpty()) {

         db.Users.findOne({
               where: {
                  email
               }
            })
            .then(usuario => {
               req.session.userLogged = {
                  id: usuario.id,
                  nombre: usuario.name,
                  apellido: usuario.last_name,
                  email: usuario.email,
                  role: usuario.rolesId,
                  avatar: usuario.avatar
               }

               if (req.body.recordar) {
                  res.cookie('PublicArte', req.session.userLogged, {
                     maxAge: 1000 * 60 * 24 * 100000
                  })
               }
               res.redirect('/');
            })
            .catch(error => {
               res.render(error)
            })

      } else {
         res.render('user/login', {
            errors: errors.mapped(),
            old: req.body
         })
      }

   },

   userProfile: function (req, res) {

      db.Users.findByPk(req.session.userLogged.id)
         .then(user => {
            return res.render('user/userProfile', {
               user: req.session.userLogged
            })
         })
   },

   editProfile: function (req, res) {

      db.Users.findByPk(+req.session.userLogged.id)
         .then(usuario => {
            return res.render('user/editProfile', {
               usuario: req.session.userLogged
            })
         })
         .catch(error => {
            res.render(error)
         })
   },

   updateProfile: function (req, res) {

      /* const errors = validationResult(req);

      if (errors.isEmpty()) {

         db.users.update({
               name: req.body.nombre.trim(),
               last_name: req.body.apellido.trim(),
               email: req.body.email.trim(),
               image: req.file ? req.file.filename : 'default-image.png',
               id_role: role
            }, {
               where: {
                  email: req.body.email
               }
            })

            .then(usuario => {
               req.session.userLogged = {
                  id: usuario.id,
                  nombre: usuario.name,
                  apellido: usuario.last_name,
                  email: usuario.email,
                  role: usuario.id_role,
                  avatar: usuario.avatar
               }
               res.redirect("/users/profile", {
                  usuario: req.session.userLogged
               })
            })

            .catch(err => {
               res.send(err)
            })

      } else {

         res.render('user/editProfile', {
            errors: errors.mapped(),
            old: req.body
         })
      } */

      const errors = validationResult(req);

      const {
         nombre,
         apellido,
         email,
         password
      } = req.body;

      if (errors.isEmpty()) {
         db.Users.update({
               name: nombre.trim(),
               last_name: apellido.trim(),
               email: email.trim(),
               avatar: req.file ? req.file.filename : req.session.userLogged.avatar,
            }, {
               where: {
                  id: +req.session.userLogged.id
               }
            })
            .then(() => {
               if (password) {
                  db.Users.update({
                        password: bcryptjs.hashSync(password.trim(), 10)
                     }, {
                        where: {
                           id: req.session.userLogged.id
                        }
                     })
                     .then(() => {
                        req.session.destroy();
                        return res.redirect('/users/login')
                     })
                     .catch(error => console.log(error))
               } else {

                  db.Users.findByPk(+req.session.userLogged.id)
                     .then(user => {
                        req.session.userLogged = {
                           id: user.id,
                           nombre: user.name,
                           apellido: user.last_name,
                           email: user.email,
                           role: user.rolesId,
                           avatar: user.avatar
                        }
                        res.locals.userLogged = req.session.userLogged

                        return res.redirect('/users/profile')
                     })
                     .catch(error => console.log(error))
               }
            })
            .catch(error => console.log(error))

      } else {
         res.render('user/editProfile', {
            errors: errors.mapped(),
            old: req.body
         })
      }

   },

   /* deleteProfile: function (req, res) {
      db.Users.destroy({
         where: {
            id: +req.params.id
         }
      })
   }, */

   logout: function (req, res) {

      req.session.destroy()
      if (req.cookies.PublicArte) {
         res.clearCookie('PublicArte', {
            path: '/'
         });
      }
      res.redirect('/')

   }
}