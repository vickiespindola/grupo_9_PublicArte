const {
    check,
    body
} = require('express-validator')
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('*El nombre no puede estar vacio.'),

    check('apellido')
    .notEmpty().withMessage('*El apellido no puede estar vacio.'),

    check('email')
    .notEmpty().withMessage('*El e-mail no puede estar vacio.').bail()
    .isEmail().withMessage('*El e-mail no es valido.'),

    /* check('role')
    .notEmpty().withMessage('*Por favor elija un perfil de usuario.'), */

]