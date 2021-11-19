'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carts.hasMany(models.Products),{
        as :'producto',
        foreingKey:'id_product' ,
        foreingKey: 'id_user'
      }
    }
  };
  Carts.init({
    amount: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};