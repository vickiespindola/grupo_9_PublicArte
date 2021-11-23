'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categories.hasMany(models.Products, {
        as: 'products',
        foreignKey: 'id_category'
      })
    }
  };
  Categories.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};