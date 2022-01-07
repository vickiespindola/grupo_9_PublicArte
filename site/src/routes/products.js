const express = require('express');
const path = require('path')
const router = express.Router();
const authUser = require('../middlewares/authUser');
const clientUser = require('../middlewares/clientUser');
const {detail, cart, products} = require('../controllers/productsController');

//product detail
router.get('/detail/:id', detail);

//cart
router.get('/cart', authUser, clientUser, cart);

//products
router.get('/', products)

module.exports = router;
