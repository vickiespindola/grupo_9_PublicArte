//node_modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const usersMulter = require('../middlewares/usersMulter');

//controller
const {
  viewLogin,
  login,
  register,
  viewRegister,
  userProfile,
  logout
} = require('../controllers/usersController')

//Middlewares
const registerValidate = require('../middlewares/registerValidate')
const loginValidate = require('../middlewares/loginValidate')

/* Routes. */

// LOGIN USER
router.get('/login', viewLogin);
router.post('/login', loginValidate,login);

//CREATE USER 
router.get('/register', viewRegister);
router.post('/register', usersMulter.single('avatar'), registerValidate,
  register)

//USER PROFILE
router.get('/profile', userProfile)

//LOGOUT PROFILE
router.get('/logout/', logout);

module.exports = router;