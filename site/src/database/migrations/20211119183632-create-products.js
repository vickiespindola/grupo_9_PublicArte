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
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      id_category: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Categories"
          },
          key: "id"
        }
      },
      id_producer: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Producers"
          },
          key: "id"
        }
      },
      id_brand: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Brands"
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
    await queryInterface.dropTable('Products');
  }
};