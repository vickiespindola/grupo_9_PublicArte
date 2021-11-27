'use strict';
const usuarios = require('../../data/users.json')

let usuario= usuarios.map(user =>{
  let constructor = {
    id:user.id,
    name: user.nombre,
    last_name: user.apellido,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
    id_role: user.usuario,
    createdAt: new Date,
    updatedAt: new Date,
}
return usuario
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', usuario, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
