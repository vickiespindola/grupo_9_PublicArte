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

    check('password')
    .notEmpty().withMessage('*Ingrese la contraseña actual'),

    body('password').custom((value, {
        req
    }) => {
        return db.Users.findOne({
                include: [{
                    all: true
                }]
            }, {
                where: {
                    id: +req.session.userLogged.id
                }
            })
            .then(usuario => {
                if (!usuario || !bcryptjs.compareSync(value, usuario.password)) {
                    return Promise.reject('Contraseña incorrecta')
                }
            })
    }),

    check('newPassword')
    .notEmpty().withMessage('*Ingrese una nueva contraseña').bail()
    .isLength({
        min: 8
    }).withMessage('*La contraseña debe tener un minimo de 8 caracteres.'),

    check('newPassword2')
    .notEmpty().withMessage('*Reingrese la nueva contraseña'),

    body('newPassword2').custom((value, {
        req
    }) => {
        if (value !== req.body.newPassword) {
            return false;
        } else {
            return true;
        }
    }).withMessage('*Las contraseñas no coinciden.')
    
]