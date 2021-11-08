const fs = require('fs');
const path = require('path');
const {
   validationResult
} = require('express-validator')

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const bcrypt = require('bcryptjs');

const controller = {
   viewLogin: function (req, res) {
      res.render('user/login');
   },
   login: function (req, res) {

      let loginErrors = validationResult(req);

      if (loginErrors.isEmpty()) {

         const usuario = users.find(e => e.email === req.body.email.trim());

         req.session.userLogged = {
            id: usuario.id,
            nombre: usuario.nombre,
            nombreCompleto: usuario.nombre + ' ' + usuario.apellido,
            email: usuario.email,
            usuario: usuario.usuario,
            avatar: usuario.avatar
         }
         res.redirect('/users/profile')
      } else {
         res.render('user/login', {
            errors: loginErrors.mapped(),
            old: req.body
         })
      }
   },
   viewRegister: function (req, res) {

      res.render('user/register');

   },
   register: function (req, res, next) {

      const errors = validationResult(req);

      if (req.fileValidationError) {
         let image = {
            param: 'avatar',
            msg: req.fileValidationError,
         }
         errors.errors.push(image)
      }

      if (errors.isEmpty()) {

         const {
            nombre,
            apellido,
            email,
            usuario,
            password,
            avatar
         } = req.body

         let newUser = {
            id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
            nombre,
            apellido,
            email,
            usuario,
            password: bcrypt.hashSync(password, 10),
            avatar: req.file ? req.file.filename : 'default-image.png',
         }

         users.push(newUser)

         fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

         req.session.userLogged = {
            id: newUser.id,
            nombre: newUser.nombre,
            nombreCompleto: newUser.nombre + ' ' + newUser.apellido,
            email: newUser.email,
            usuario: newUser.usuario,
            avatar: newUser.avatar

         }
         res.redirect('/')

      } else {
         res.render('user/register', {
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
      res.render('user/editProfile', {
         user: req.session.userLogged
      })
   },
   storeProfile: function (req, res) {
      let id = +req.params.id

      const {
         nombre,
         apellido,
         avatar,
         usuario,
         email,
      } = req.body

      let user = users.find(element => element.id == id);

      let editUser = {
         id: +req.params.id,
         nombre,
         apellido,
         avatar: req.file ? req.file.filename : null,
         usuario,
         email,
      }
      let userModificado = users.map(e => e.id === +req.params.id ? editUser : user)
      fs.writeFileSync(productsFilePath, JSON.stringify(userModificado, null, 2));

      res.redirect('/users/profile')
   },
   logout: function (req, res) {
      req.session.destroy();
      res.redirect('/')
   }
}

module.exports = controller;