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
          as: 'products', 
          foreignKey: 'productsId'
        }),
      Carts.belongsTo(models.Users, {
          as: 'users', 
          foreignKey: 'usersId'
        }),
      Carts.hasMany(models.Orders, {
          as: 'orders',
          foreignKey: 'cartsId'
        })
    }
  };
  Carts.init({
    amount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    usersId: DataTypes.INTEGER,
    productsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};