const express = require('express');
const router = express.Router();
const path = require('path');
const {
    list,
    create,
    store,
    edit,
    update,
    destroy
} = require('../controllers/adminController')

const productsMulter = require('../middlewares/productsMulter');
const productValidate = require('../validations/productValidate');
const authUser = require('../middlewares/authUser');

//SHOW ALL PRODUCTS
router.get('/', authUser, list);

// CREATE ONE PRODUCT
/* para mostrar la vista con el formulario */
router.get('/create', authUser, create)
/* crea el formulario */
router.post('/create', productsMulter.array('imagen'), authUser, productValidate, store)

//EDIT ONE PRODUCT
router.get('/edit/:id', authUser, edit)
router.put('/edit/:id', productsMulter.array('imagen'), authUser, productValidate, update)

//DELETE ONE PRODUCT
router.delete('/delete/:id', authUser, destroy)

module.exports = router;