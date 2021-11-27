'use strict';

const users = require('../../data/users.json')

let producers = users.map((usuario,index) => {
  let producer = {
    id_user: index + 1,
    createdAt: new Date,
    updatedAt: new Date,
  }
  return producer
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Producers', producers, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Producers', null, {});

  }
};