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
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      categoriesId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Categories"
          },
          key: "id"
        }
      },
      producersId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Producers"
          },
          key: "id"
        }
      },
      brandsId: {
        allowNull: false,
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