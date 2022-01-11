const db = require('../database/models');
const {
  Op
} = require('sequelize');

const controller = {

  home: function (req, res) {

    db.Products.findAll({
        include: [{
          all: true
        }]
      })
      .then(products => {
        res.render('home', {
          products
        });
      })
      .catch(error => console.log(error))

  },

  search: (req, res) => {
    //Falta hacerlo funcionar
    db.Products.findAll({
        include: [{
          all: true
        }],
        where: {
          [Op.or]: [{
              name: {
                [Op.substring]: req.query.keywords
              }
            },
            {
              description: {
                [Op.substring]: req.query.keywords
              }
            }
          ]
        }
      })
      .then(products => {
        return res.render('search', {
          products,
          busqueda: req.query.keywords.trim()
        })
      })
      .catch(error => console.log(error))

  },
  
  aboutUs: (req,res)=> {
    res.render('aboutUs')
  }, 

  questions: (req,res)=> {
    res.render('questions')
  },
  conditions: (req,res)=> {
    res.render('conditions')
  }
}
module.exports = controller;