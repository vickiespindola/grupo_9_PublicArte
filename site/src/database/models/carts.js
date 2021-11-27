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
      Carts.belongsTo(models.Products, {
          as: 'products'
        }),
      Carts.belongsTo(models.Users, {
          as: 'users'
        }),
      Carts.hasMany(models.Orders, {
          as: 'orders',
          foreignKey: 'id_cart'
        })
    }
  };
  Carts.init({
    amount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};