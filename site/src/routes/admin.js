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
const adminUser = require('../middlewares/adminUser');

//SHOW ALL PRODUCTS
router.get('/', adminUser, authUser, list);

// CREATE ONE PRODUCT
/* para mostrar la vista con el formulario */
router.get('/create', adminUser, authUser, create)
/* crea el formulario */
router.post('/create', productsMulter.array('imagen'), adminUser, authUser, productValidate, store)

//EDIT ONE PRODUCT
router.get('/edit/:id', authUser, adminUser, edit)
router.put('/edit/:id', productsMulter.array('imagen'), authUser, adminUser, productValidate, update)

//DELETE ONE PRODUCT
router.delete('/delete/:id', authUser, adminUser, destroy)

module.exports = router;