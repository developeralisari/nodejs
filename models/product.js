const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./category');  // Category modelini doğru şekilde dahil edin

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Kategorisi olmayabilir
    },
  },
  { sequelize, modelName: 'product' }
);

// İlişkileri burada tanımlıyoruz
Product.belongsTo(Category, { foreignKey: 'categoryId' });  // categoryId ile ilişkiyi kuruyoruz

module.exports = Product;
