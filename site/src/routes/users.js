//node_modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//controller
const {
  login,
  processLogin,
  register,
  processRegister,
  userProfile,
  /* editProfile,
  storeProfile, */
  logout
} = require('../controllers/usersController')

//Middlewares
const usersMulter = require('../middlewares/usersMulter');
const registerValidate = require('../validations/registerValidate')
const loginValidate = require('../validations/loginValidate')
const guestUser = require('../middlewares/guestUser')
const authUser = require('../middlewares/authUser')

/* Routes. */

// LOGIN USER
router.get('/login', guestUser, Login);
router.post('/login', loginValidate, processLogin);

//CREATE USER 
router.get('/register', guestUser, Register);
router.post('/register', usersMulter.single('avatar'), registerValidate,
  processRegister)

//USER PROFILE
router.get('/profile', authUser, userProfile)

//EDIT PROFILE
/* router.get('/profile/edit/:id', authUser, editProfile)
router.put('/profile/edit/:id', usersMulter.single('avatar'),authUser, updateProfile) */

//LOGOUT PROFILE
router.get('/logout/', logout);

module.exports = router;