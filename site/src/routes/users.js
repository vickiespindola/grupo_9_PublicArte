const express = require('express');
const router = express.Router();
const {login, register,viewRegister} = require('../controllers/usersController')
const fs = require('fs'); 
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/img/users')
    },
    filename: function (req, file, callback) {
      callback(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
});
  
const uploadFile = multer({storage});

/* GET users listing. */

// LOGIN USER
router.get('/login', login);

 //CREATE USER 
router.get('/register', viewRegister);
/* ESTA RUTA DESPUES LA LLEVAMOS AL CONTROLADOR */
router.post('/register', uploadFile.single('avatar'),
register )
module.exports = router;
