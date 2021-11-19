'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', [], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Images', null, {});

  }
};
