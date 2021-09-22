const controller ={
    productDetail: function(req, res, next) {
       res.render('product-detail');
     },
    cart: function(req, res, next) {
        res.render('cart');
      }
   }
   module.exports = controller;