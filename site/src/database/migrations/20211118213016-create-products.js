'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      id_category: {
        type: Sequelize.INTEGER,
        reference:{
          model:{
            tableName: 'Categories'
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      id_producer: {
        type: Sequelize.INTEGER,
        reference:{
          model:{
            tableName: 'Producers'
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      id_brand: {
        type: Sequelize.INTEGER,
        reference:{
          model:{
            tableName: 'Brand'
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
    await queryInterface.dropTable('Products');
  }
};