const express = require('express');
const path = require('path')
const router = express.Router();
const {detail, cart} = require('../controllers/productsController')

//product detail
router.get('/detail/:id', detail);


//cart
router.get('/cart', cart);

module.exports = router;
