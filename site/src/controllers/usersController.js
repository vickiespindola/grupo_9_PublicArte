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

      if (errors.isEmpty()) {
         const {
            nombre,
            apellido,
            email,
            role,
            password
         } = req.body

         /* 
         if (req.fileValidationError) {
            let image = {
               param: 'avatar',
               msg: req.fileValidationError,
            }
            errors.errors.push(image)
         }
         */
         let img = req.files[0].filename;

         db.Users.create({
               name: nombre.trim(),
               last_name: apellido.trim(),
               email: email.trim(),
               password: bcryptjs.hashSync(password.trim(), 10),
               avatar: img ? img : 'default-image.png',
               id_role: role
            })
            .then(usuario => {
               req.session.userLogged = {
                  id: usuario.id,
                  nombre: usuario.name,
                  apellido: usuario.last_name,
                  email: usuario.email,
                  role: usuario.d_role,
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

   Login: function (req, res) {
      res.render('user/login');
   },

   processLogin: function (req, res) {

      const errors = validationResult(req)

      if (errors.isEmpty()) {
         const {
            email,
            recordar
         } = req.body

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
                  role: usuario.d_role,
                  avatar: usuario.avatar
               }

               if (recordar) {
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
      res.render('user/userProfile', {
         user: req.session.userLogged
      })
   },
   editProfile: function (req, res) {

      db.Users.findByPk(+req.params.id)
         .then(usuario => {
            res.render('user/editProfile', {
               usuario: usuario.dataValues
            })
         })
         .catch(error => {
            res.render(error)
         })
   },
   updateProfile: function (req, res) {

      db.Users.update(
            req.body, {
               where: {
                  id: +req.params.id
               }
            })
         .then(result => {
            if (result[0] != 0) {
               res.redirect('/users/profile', {
                  user: req.session.userLogged
               })
            } else {

            }
         })
         .catch(error => {
            res.render(error)
         })

      /*
            const {
               nombre,
               apellido,
               avatar,
               role,
               email,
            } = req.body

            let user = users.find(element => element.id == id);

            let editUser = {
               id: +req.params.id,
               nombre,
               apellido,
               avatar: req.file ? req.file.filename : null,
               role,
               email,
            }
            let userModificado = users.map(e => e.id === +req.params.id ? editUser : user)
            fs.writeFileSync(usersFilePath, JSON.stringify(userModificado, null, 2));

            req.session.userLogged = {
               id: editUser.id,
               nombre: editUser.nombre,
               apellido: editUser.apellido,
               email: editUser.email,
               role: editUser.usuario,
               avatar: editUser.avatar
            }

            res.redirect('/users/profile')
         }, */
   },

   /* deleteProfile: function(req, res){

   }, */

   logout: function (req, res) {

      req.session.destroy();

      if (req.cookies.PublicArte) {
         res.cookie('PublicArte', '', {
            maxAge: -1
         })
      }

      res.redirect('/')
   }

}