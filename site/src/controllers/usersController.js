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
         const {
            email,
            password
         } = req.body

         const usuario = users.find(e => e.email === email);
         let hash = bcrypt.compareSync(password, usuario.password)
         if (hash) {
            delete usuario.password;
            req.session.userLogged = usuario;
            res.redirect('/users/profile')
         }
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

      const registerErrors = validationResult(req);

      if (registerErrors.isEmpty()) {

         const {
            nombre,
            apellido,
            email,
            usuario,
            password1,
            avatar
         } = req.body

         let newUser = {
            id: users[users.length-1] ? users[users.length - 1].id + 1: 1,
            nombre,
            apellido,
            email,
            usuario,
            password1: bcrypt.hashSync(password1, 10),
            avatar: req.file ? req.file.filename : 'default-image.png',
         }

         users.push(newUser)

         fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

         req.session.userLogged = {
            id: newUser.id,
            nombre: newUser.nombre,
            usuario: newUser.usuario
         }
         res.redirect('/')

      } else {
         res.render('user/register', {
            errors: registerErrors.mapped(),
            old: req.body
         })
      }

   },
   userProfile: function (req, res) {
      res.render('user/userProfile', {
         user: req.session.userLogged
      })
   },
   logout: function (req, res) {
      req.session.destroy();
      res.redirect('/')
   }
}

module.exports = controller;