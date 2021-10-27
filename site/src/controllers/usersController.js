const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const bcrypt = require('bcryptjs');



const controller = {
   login: function (req, res, next) {
      res.render('user/login');
   },
   viewRegister: function (req, res, next) {
      res.render('user/register');

   },
   register: function (req, res, next) {

     
      const {nombre, apellido, email,usuario,password,avatar} = req.body

      let usersNew = {
          id : users[users.length - 1].id + 1,
          nombre,
          apellido,
          email,
          usuario,
          password: bcrypt.hashSync(password, 10),
          avatar : req.file ? req.file.filename : 'default-image.png',
          
          
      }
      users.push(usersNew)
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      res.redirect('/')

   }

}

module.exports = controller;