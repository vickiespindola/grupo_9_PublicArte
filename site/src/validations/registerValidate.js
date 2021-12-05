const {
    check,
    body
} = require('express-validator')
const db = require('../database/models');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('*El nombre no puede estar vacio.'),

    check('apellido')
    .notEmpty().withMessage('*El apellido no puede estar vacio.'),

    check('email')
    .notEmpty().withMessage('*El e-mail no puede estar vacio.').bail()
    .isEmail().withMessage('*El e-mail no es valido.'),

    check('password')
    .notEmpty().withMessage('*La contraseña no puede estar vacia.').bail()
    .isLength({
        min: 8
    }).withMessage('*La contraseña debe tener un minimo de 8 caracteres.'),

    check('password2')
    .notEmpty().withMessage('*Por favor repita la contraseña.').bail()
    .isLength({
        min: 8
    }).withMessage('*La contraseña debe tener un minimo de 8 caracteres.'),

    /* check('role')
    .notEmpty().withMessage('*Por favor elija un perfil de usuario.'), */

    body('email').custom(value => {
        return db.Users.findOne({
                where: {
                    email: value
                }
            })
            .then(usuario => {
                if (usuario) {
                    return Promise.reject('Este email ya está registrado')
                }
            })
    }),
    body('password2').custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            return false;
        } else {
            return true;
        }
    }).withMessage('*Las contraseñas no coinciden.')
]