const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  detail: function (req, res, next) {
    let {id} = req.params;
    let productDetail = products.find(element => element.id == id)
    let similarProducts = products.filter(element => {return element.categoria == productDetail.categoria})
    res.render('product/detail',{productDetail,similarProducts});
  },
  cart: function (req, res, next) {
    similarProducts = products;
    res.render('product/cart',{similarProducts});
  }
}
module.exports = controller;