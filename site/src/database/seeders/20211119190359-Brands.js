'use strict';
const productos = require('../../data/products.json')

let marcas = productos.map( products =>{
  let marca= {
    name: products.marca,
    createdAt: new Date,
    updatedAt: new Date,
   } 
return marca

})
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Brands', marcas, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Brands', null, {});

  }
};