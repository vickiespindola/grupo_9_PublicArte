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
        as: 'brands'
      }),
      Products.belongsTo(models.Categories, {
        as: 'categories'
      }),
      Products.belongsTo(models.Producers, {
        as: 'producers'
      }),
      Products.hasMany(models.Images, {
        as: 'images',
        foreignKey: 'id_product'
      }),
      Products.hasMany(models.Carts, {
        as: 'carts',
        foreignKey: 'id_product'
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(500),
    price: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    id_producer: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};