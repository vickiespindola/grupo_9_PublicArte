const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  detail: function (req, res, next) {
    let {
      id
    } = req.params;
    let productDetail = products.find(element => element.id == id)
    let similarProducts = products.filter(element => element.categoria === productDetail.categoria)

    fs.writeFileSync(productsFilePath, JSON.stringify(products))
    res.render('product/detail', {
      productDetail,
      similarProducts
    });
  },
  cart: (req, res) => {
    
    similarProducts = products;
    let productAdded = products.filter(element => {
      return element.carrito == true
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(products))

    res.render('product/cart', {
      similarProducts,
      productAdded
    });
  }
}
module.exports = controller;