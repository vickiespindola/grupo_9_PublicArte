'use strict';
const usuarios = require('../../data/users.json')

let users= usuarios.map(user =>{
  let usuario = {
    name: user.nombre,
    last_name: user.apellido,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
    id_role: 1,
    createdAt: new Date,
    updatedAt: new Date,
}
return usuario
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', users, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
