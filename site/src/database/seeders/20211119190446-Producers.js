'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Producers', [], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Producers', null, {});

  }
};