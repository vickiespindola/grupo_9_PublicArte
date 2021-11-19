'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brands.hasMany(models.Products,{
        as :'product',
       
      })
    }
  };
  Brands.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brands',
  });
  return Brands;
};