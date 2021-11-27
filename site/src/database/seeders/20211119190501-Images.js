'use strict';
const productos = require('../../data/products.json')

let imagenes = images.map( images =>{
  let img= {
    id: images.id, 
    file:images.imagen,
    id_product:images.id,
    createdAt: new Date,
    updatedAt: new Date,
   } 
return producer

})
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', imagenes, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Images', null, {});

  }
};
