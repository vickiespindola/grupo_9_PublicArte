'use strict';
let roles= [ 'admi', 'user', 'seler']

let array= roles.map(rol =>{
  let constructor = {
    name: rol,
    createdAt: new Date,
    updatedAt: new Date,
}
return constructor
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Roles', roles, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Roles', null, {});

  }
};