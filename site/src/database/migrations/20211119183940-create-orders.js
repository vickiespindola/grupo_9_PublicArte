'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usersId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        }
      },
      cartsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Carts"
          },
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};