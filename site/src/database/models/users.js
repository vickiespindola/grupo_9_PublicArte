'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Roles, {
        as: 'roles',
        foreignKey: 'rolesId'
      }),
      Users.hasMany(models.Carts, {
        as: 'carts',
        foreignKey: 'usersId'
      }),
      Users.hasMany(models.Orders, {
        as: 'orders',
        foreignKey: 'usersId'
      }),
      Users.hasOne(models.Producers,{
        as: 'producers',
        foreignKey: 'usersId'
      })
    }
  };
  Users.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rolesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};