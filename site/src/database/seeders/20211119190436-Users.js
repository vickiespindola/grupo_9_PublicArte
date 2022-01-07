'use strict';
const usuarios = require('../../data/users.json')

let users= usuarios.map(user =>{
  let usuario = {
    name: user.nombre,
    last_name: user.apellido,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
    brand: user.marca,
    rolesId: user.role,
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
