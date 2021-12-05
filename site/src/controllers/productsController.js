const db = require('../database/models');

const controller = {

  detail: function (req, res) {
    db.Products.findByPk(req.params.id, {
        include: [{
          all: true
        }]
      })
      .then((products) => {
        return res.render('product/detail', {
          products
        })
      })
      .catch((error) => res.send(error))

  },

  cart: (req, res) => {

    db.Products.findAll({
        include: [{
          all: true
        }]
      })
      .then(products => {
        return res.render('product/cart', {
          products
        })
      })

  }
}
module.exports = controller;