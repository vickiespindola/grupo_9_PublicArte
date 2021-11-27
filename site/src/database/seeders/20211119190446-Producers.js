'use strict';


const productos = require('../../data/products.json')

let productores = productos.map( productor =>{
  let producer= {
    id_user: productor.autor,    
    createdAt: new Date,
    updatedAt: new Date,
   } 
return producer

})
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Producers', productores, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Producers', null, {});

  }
};