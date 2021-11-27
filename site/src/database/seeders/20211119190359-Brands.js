'use strict';

const marcas= ['Pirulo', 'Patito', 'Dia']

let brands = marcas.map(marcas => {
  let marca = {
    name: marcas,
    createdAt: new Date,
    updatedAt: new Date,
  }
  return marca
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Brands', brands, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Brands', null, {});

  }
};