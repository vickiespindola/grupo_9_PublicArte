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
      Producers.hasMany(models.Products, {
        as: 'products',
        foreignKey: 'producersId'
      }),
      Producers.belongsTo(models.Users,{
        as: 'users',
        foreignKey: 'usersId'
      })
    }
  };
  Producers.init({
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producers',
  });
  return Producers;
};