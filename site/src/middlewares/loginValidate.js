const {
    check,
    body
} = require('express-validator')
const path = require('path')
const fs = require('fs')
const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')))
const bcrypt = require('bcryptjs')

module.exports = [
    check('email')
    .notEmpty().withMessage('*El e-mail no puede estar vacio.').bail()
    .isEmail().withMessage('*El e-mail no es valido.'),
    body('email').custom((value, {
        req
    }) => {
        let usuario = usuarios.find(usuario => usuario.email === value && bcrypt.compareSync(req.body.password, usuario.password))

        if (usuario) {
            return true;
        } else {
            return false;
        }
    }).withMessage('*Credenciales invalidas.')
]