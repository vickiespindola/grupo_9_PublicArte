const {
    check,
    body
} = require('express-validator')
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

module.exports = [
    check('password')
    .notEmpty().withMessage('*Ingrese la contraseña actual').bail()
    .custom((value, {
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
    .notEmpty().withMessage('*Reingrese la nueva contraseña').bail()
    .custom((value, {
        req
    }) => {
        if (value !== req.body.newPassword) {
            return false;
        } else {
            return true;
        }
    }).withMessage('*Las contraseñas no coinciden.')
]