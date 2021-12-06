'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_price: {
        allowNull: false,
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
      productsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Products"
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
    await queryInterface.dropTable('Carts');
  }
};