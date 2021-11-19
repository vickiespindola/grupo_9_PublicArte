'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Carts, {
        as: 'carts'
      }),
      Orders.belongsTo(models.Users, {
        as: 'users'
      })
    }
  };
  Orders.init({
    id_user: DataTypes.INTEGER,
    id_cart: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};