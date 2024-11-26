const sequelize = require('../database');
const Category = require('./category');
const Product = require('./product');

// İlişkileri tanımlayın
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { sequelize, Category, Product };
