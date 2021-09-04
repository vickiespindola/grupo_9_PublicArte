const express = require('express');
const router = express.Router();
const path =require('path')

router.get('/register',(req,res)=> res.sendFile(path.join(__dirname,'..','views','register.html')))
router.get('/login',(req,res)=> res.sendFile(path.join(__dirname,'..','views','login.html')))
router.get('/product-detail',(req,res)=> res.sendFile(path.join(__dirname,'..','views','product-detail.html')))
router.get('/cart',(req,res)=> res.sendFile(path.join(__dirname,'..','views','cart.html')))

module.exports = router;