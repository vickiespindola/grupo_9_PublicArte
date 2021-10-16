const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/usersController')
const fs = require('fs'); 
const path = require('path');


/* GET users listing. */

// LOGIN USER
router.get('/login', login);

 //CREATE USER 
router.get('/register', register);
/* ESTA RUTA DESPUES LA LLEVAMOS AL CONTROLADOR */
router.post('/register', (req,res) => {
    const ruta = (path.join(__dirname,'..', 'data', 'user.json'));
    
    const usuariosRegistrados = fs.readFileSync(ruta, 'utf-8');
    let usuarios
    
    if (usuariosRegistrados === ''){
        usuarios = []
    } else {
        usuarios = JSON.parse(usuariosRegistrados)
    }

    const usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contraseña: req.body.contraseña,
    }
    
    usuarios.push(usuario)

    fs.writeFileSync(ruta, JSON.stringify(usuarios, null, 2))

    res.redirect('/users/register')
})

module.exports = router;
