const controller = {
  productDetail: function (req, res, next) {
    res.render('product/product-detail');
  },
  cart: function (req, res, next) {
    res.render('product/cart');
  }
}
module.exports = controller;