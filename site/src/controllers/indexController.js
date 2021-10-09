const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  home: function (req, res, next ) {
    let productPopular = products.filter(element=> {return element.keyword == 'popular'})
    res.render('home', {
      products, productPopular});
  },
  search: (req,res)=> {
    res.render('search')
  }
}
module.exports = controller;