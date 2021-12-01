'use strict';
const productos = require('../../data/products.json')

let images = productos.map((images,index) => {
  let img = {
    file: images.imagen,
    id_product: index + 1,
    createdAt: new Date,
    updatedAt: new Date,
  }
  return img
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', images, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Images', null, {});

  }
};