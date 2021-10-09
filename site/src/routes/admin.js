const express = require('express');
const router = express.Router();
const path =  require('path');
const {list,create,store,edit,update,destroy} = require('../controllers/adminController')

//SHOW ALL PRODUCTS
router.get('/admin', list);

// CREATE ONE PRODUCT
/* para mostrar la vista con el formulario */
router.get('/create', create)
/* crea el formulario */
router.post('/create', store)

//EDIT ONE PRODUCT
router.get('/edit/:id', edit)
router.put('/edit/:id', update)

//DELETE ONE PRODUCT
router.delete('/delete/:id', destroy)

module.exports = router;