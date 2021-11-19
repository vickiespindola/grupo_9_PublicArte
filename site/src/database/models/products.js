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
Products.belongsTo(models.Brands,{
  as: 'brand',
  foreingKey:'id_brand' 
}),
Products.belongsTo(models.Categories),{
  as: 'categories'
},
Products.belongsTo(models.Producers),{
  as: 'producers'
},
Products.hasMany(models.Carts),{
  as :'carts',
  foreingKey:'id_Product' 
}

     Products.hasMany(models.Images),{
       as :'imagenes',
       foreingKey:'id_Product' 
     }
    }
  };
  Products.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    id_category: DataTypes.INTEGER,
    id_producer: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};