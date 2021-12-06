'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Brands, {
        as: 'brands',
        foreignKey: 'brandsId'
      }),
      Products.belongsTo(models.Categories, {
        as: 'categories',
        foreignKey: 'categoriesId'
      }),
      Products.belongsTo(models.Producers, {
        as: 'producers',
        foreignKey: 'producersId'
      }),
      Products.hasMany(models.Images, {
        as: 'images',
        foreignKey: 'productsId'
      }),
      Products.hasMany(models.Carts, {
        as: 'carts',
        foreignKey: 'productsId'
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(500),
    price: DataTypes.INTEGER,
    categoriesId: DataTypes.INTEGER,
    producersId: DataTypes.INTEGER,
    brandsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};