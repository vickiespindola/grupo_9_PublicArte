'use strict';

const productos = require('../../data/products.json')

let products = productos.map((producto,index) => {

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let product = {
    name: producto.titulo,
    description: producto.descripcion,
    price: producto.precio,
    categoriesId: random(1,6),
    usersId: 1,
    createdAt: new Date,
    updatedAt: new Date,
  }
  
  return product

})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Products', products, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {});

  }
};