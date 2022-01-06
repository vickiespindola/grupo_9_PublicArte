const express = require('express');
const path = require('path')
const router = express.Router();
const {detail, cart} = require('../controllers/productsController')
const authUser = require('../middlewares/authUser');

//product detail
router.get('/detail/:id', detail);

//cart
router.get('/cart', authUser, cart);

module.exports = router;
