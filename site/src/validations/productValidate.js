const {
    check,
    body
} = require('express-validator')

module.exports = [
    check('titulo')
    .notEmpty().withMessage('*El nombre del producto no puede estar vacio.'),

    check('marca')
    .notEmpty().withMessage('*La marca del producto no puede estar vacia.'),

    check('categoria')
    .notEmpty().withMessage('*Debe seleccionar una categoria.'),

    check('descripcion')
    .notEmpty().withMessage('*Ingrese una descripcion del producto'),

    check('precio')
    .notEmpty().withMessage('*El precio del producto no puede estar vacio.').bail()
    .isInt().withMessage('*Ingrese solo números.')
]