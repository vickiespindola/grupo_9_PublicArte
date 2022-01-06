const express = require('express');
const path = require('path')
const router = express.Router();
const {detail, cart, products} = require('../controllers/productsController')

//product detail
router.get('/detail/:id', detail);

//cart
router.get('/cart', cart);

//products
router.get('/', products)

module.exports = router;
