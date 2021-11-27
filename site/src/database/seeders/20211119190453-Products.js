'use strict';

const productos = require('../../data/products.json')

let products = productos.map( producto =>{
  let product= {
    id: producto.id,    
    name:producto.titulo,
    description:producto.descripcion,
    price:producto.precio,
    id_category:producto.categoria,
    id_pruducer: producto.autor,
    id_brand:producto.marca,

    createdAt: new Date,
    updatedAt: new Date,
   } 
return products

})
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Products', products, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {});

  }
};
