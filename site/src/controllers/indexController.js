const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller ={
 home: function(req, res, next) {
    res.render('home',{products});
  }
}
module.exports = controller;