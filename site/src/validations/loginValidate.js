const {
    check,
    body
} = require('express-validator')
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

module.exports = [

    check('email')
    .notEmpty().withMessage('*El e-mail no puede estar vacio.').bail()
    .isEmail().withMessage('*El e-mail no es valido.'),

    body('email')
    .custom((value, {
        req
    }) => {
        console.log(req.body)
        return db.Users.findOne({
                include: [{
                    all: true
                }]
            }, {
                where: {
                    email: value
                }
            })
            .then(usuario => {
                if (!usuario || !bcryptjs.compareSync(req.body.password, usuario.password)) {
                    return Promise.reject('email y/o contraseña incorrectas')
                }
            })
            .catch(error => console.log(error))
    })

]