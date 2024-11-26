const AbstractRepository = require('./abstractRepository');
const Category = require('../models/category');

class CategoryService extends AbstractRepository {
  constructor() {
    super(Category);
  }
}

module.exports = new CategoryService();
