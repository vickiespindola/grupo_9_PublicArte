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
  editProfile,
  updateProfile,
  deleteProfile,
  logout
} = require('../controllers/usersController')

//Middlewares
const registerValidate = require('../validations/registerValidate')
const loginValidate = require('../validations/loginValidate')
const usersMulter = require('../middlewares/usersMulter');
const guestUser = require('../middlewares/guestUser')
const authUser = require('../middlewares/authUser')

/* Routes. */

// LOGIN USER
router.get('/login', guestUser, login);
router.post('/login', loginValidate, processLogin);

//CREATE USER 
router.get('/register', guestUser, register);
router.post('/register', usersMulter.single('avatar'), registerValidate,
  processRegister)

//USER PROFILE
router.get('/profile', authUser, userProfile)

//EDIT PROFILE
router.get('/profile/edit/:id', authUser, editProfile)
router.put('/profile/edit/:id', usersMulter.single('avatar'), authUser, updateProfile)

//DELETE PROFILE
router.delete('/profile/delete/:id', authUser, deleteProfile)

//LOGOUT PROFILE
router.get('/logout', logout);

module.exports = router;