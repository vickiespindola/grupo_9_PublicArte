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
        as: 'carts',
        foreignKey: 'cartsId'
      }),
      Orders.belongsTo(models.Users, {
        as: 'users',
        foreignKey: 'usersId'
      })
    }
  };
  Orders.init({
    usersId: DataTypes.INTEGER,
    cartsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};