'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.belongsTo(models.Products, {
        as: 'products',
        foreignKey: 'productsId'
      })
    }
  };
  Images.init({
    file: DataTypes.STRING,
    productsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};