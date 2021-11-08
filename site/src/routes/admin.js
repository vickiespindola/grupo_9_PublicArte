const express = require('express');
const router = express.Router();
const path =  require('path');
const {list,create,store,edit,update,destroy} = require('../controllers/adminController')

const productsMulter = require('../middlewares/productsMulter');

//SHOW ALL PRODUCTS
router.get('/', list);

// CREATE ONE PRODUCT
/* para mostrar la vista con el formulario */
router.get('/create', create)
/* crea el formulario */
router.post('/create', productsMulter.single('imagen'), store)

//EDIT ONE PRODUCT
router.get('/edit/:id', edit)
router.put('/edit/:id', productsMulter.single('imagen'), update)

//DELETE ONE PRODUCT
router.delete('/delete/:id', destroy)

module.exports = router; 