var express = require('express');
var router = express.Router();
const {productDetail, cart} = require('../controllers/productsController')

router.get('/product-detail', productDetail);
router.get('/cart', cart);

module.exports = router;
