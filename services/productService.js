const AbstractRepository = require('./abstractRepository');
const Product = require('../models/product');
const Category = require('../models/category');

class ProductService extends AbstractRepository {
    constructor() {
      super(Product);
    }
  }
  
  module.exports = new ProductService();
  