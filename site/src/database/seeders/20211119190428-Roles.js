'use strict';
let role= [ 'admin', 'vendedor', 'comprador']

let roles= role.map(role =>{
  let array = {
    name: role,
    createdAt: new Date,
    updatedAt: new Date,
}
return array
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Roles', roles, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Roles', null, {});

  }
};