'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producers.hasMany(models.Products),{
        as :'product',
        foreingKey:'id_Product' 
      }
    }
  };
  Producers.init({
    id_users: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producers',
  });
  return Producers;
};