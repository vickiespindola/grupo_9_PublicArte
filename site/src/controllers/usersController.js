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
               brand: null,
               rolesId: 3
            })
            .then(usuario => {
               req.session.userLogged = {
                  id: usuario.id,
                  nombre: usuario.name,
                  apellido: usuario.last_name,
                  email: usuario.email,
                  role: usuario.rolesId,
                  avatar: usuario.avatar,
                  brand: usuario.brand
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
                  avatar: usuario.avatar,
                  brand: usuario.brand
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
            let rol = ''
            switch (req.session.userLogged.role) {
               case 1:
                  rol = 'Admin'
                  break;
               case 2:
                  rol = 'Vendedor'
                  break;
               case 3:
                  rol = 'Cliente'
                  break;
               default:
                  rol = null
                  break;
            }
            return res.render('user/userProfile', {
               user: req.session.userLogged,
               rol
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


      const errors = validationResult(req);

      const {
         nombre,
         apellido,
         email,
         marca
      } = req.body;

      if (errors.isEmpty()) {

         db.Users.update({
               name: nombre.trim(),
               last_name: apellido.trim(),
               email: email.trim(),
               avatar: req.file ? req.file.filename : req.session.userLogged.avatar,
               brand: marca
            }, {
               where: {
                  id: +req.session.userLogged.id
               }
            })
            .then(() => {
               db.Users.findByPk(+req.session.userLogged.id)
                  .then(user => {
                     req.session.userLogged = {
                        id: user.id,
                        nombre: user.name,
                        apellido: user.last_name,
                        email: user.email,
                        role: user.rolesId,
                        avatar: user.avatar,
                        brand: user.brand
                     }
                     res.locals.userLogged = req.session.userLogged

                     return res.redirect('/users/profile')
                  })
                  .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

      } else {
         res.render('user/editProfile', {
            errors: errors.mapped(),
            old: req.body
         })
      }

   },

   password: (req, res) => {

      res.render('user/change-password')

   },

   updatePassword: (req, res) => {

      const errors = validationResult(req);

      if (errors.isEmpty()) {

         const {
            newPassword
         } = req.body

         console.log("La nueva contraseña es " + newPassword)
         const newPass = bcryptjs.hashSync(newPassword.trim(), 10)
         console.log("Y encriptada se ve " + newPass)

         db.Users.update({
               password: newPass
            }, {
               where: {
                  id: +req.session.userLogged.id
               }
            })
            .then(() => {
               req.session.destroy();
               return res.redirect('/users/login')
            })
            .catch(error => console.log(error))

      } else {
         res.render('user/change-password', {
            errors: errors.mapped(),
            old: req.body
         })
      }

   },

   /* deleteProfile: function (req, res) {
      db.Users.destroy({
            where: {
               id: +req.params.id
            },
            include: [{
               all: true
            }]
         })
         .then(() => {
            return res.redirect("/users/login")
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