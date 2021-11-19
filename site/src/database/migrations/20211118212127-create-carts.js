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
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.DECIMAL(10)
      },
      id_user: {
        type: Sequelize.INTEGER,
        reference:{
          model:{
            tableName: 'Users'
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      id_product: {
        type: Sequelize.INTEGER,
        reference:{
          model:{
            tableName: 'Products'
          },
          key: 'id'
        },
        onDelete: 'cascade'
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