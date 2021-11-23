'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Brands', [], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Brands', null, {});

  }
};