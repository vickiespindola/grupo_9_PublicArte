const {check,body} = require('express-validator')

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
    .isLength({min: 8}).withMessage('*La contraseña debe tener un minimo de 8 caracteres.'),

    check('password2')
    .notEmpty().withMessage('*Por favor repita la contraseña.'),

    check('usuario')
    .notEmpty().withMessage('*Por favor elija un perfil de usuario.'),

    body('password2').custom((value,{req}) =>{
        if(value !== req.body.password){
            return false;
        }
        else{
            return true;
        }
    }).withMessage('*La verificacion de la contraseña no coincide.')
]