'use strict';
let categorias= [ 'billeteras', 'carteras', 'monederos', 'floreros', 'cuadros', 'accesorios']
let array= categorias.map(categoria =>{
  let categories = {
    name: categoria,
    createdAt: new Date,
    updatedAt: new Date,
} 
return categories
})


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categories', categorias, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};