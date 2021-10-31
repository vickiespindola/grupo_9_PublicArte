//node_modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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
const usersMulter = require('../middlewares/usersMulter');
const registerValidate = require('../middlewares/registerValidate')
const loginValidate = require('../middlewares/loginValidate')
const guestUser = require('../middlewares/guestUser')
const authUser = require('../middlewares/authUser')

/* Routes. */

// LOGIN USER
router.get('/login', guestUser, viewLogin);
router.post('/login', loginValidate, login);

//CREATE USER 
router.get('/register', guestUser, viewRegister);
router.post('/register', usersMulter.single('avatar'), registerValidate,
  register)

//USER PROFILE
router.get('/profile', authUser, userProfile)

//LOGOUT PROFILE
router.get('/logout/', logout);

module.exports = router;