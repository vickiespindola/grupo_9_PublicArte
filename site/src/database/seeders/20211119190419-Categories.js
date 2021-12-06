'use strict';

let categorias = ['Billeteras', 'Carteras', 'Monederos', 'Cuadros', 'Accesorios', 'Vajilla', 'Deco', 'Vestimenta']

let categories = categorias.map(categoria => {
  let newArray = {
    name: categoria,
    createdAt: new Date,
    updatedAt: new Date,
  }
  return newArray
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};