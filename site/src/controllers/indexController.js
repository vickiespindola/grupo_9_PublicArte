const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  home: function (req, res, next ) {
    res.render('home', {
      products});
  },
  search: (req,res)=> {
    res.render('search')
  }
}
module.exports = controller;