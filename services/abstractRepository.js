class AbstractRepository {
    constructor(model) {
      this.model = model;
    }
  
    async findAll(include = []) {
      return await this.model.findAll({
        include: include, // Use the include parameter to add relationships like Category
      });
    }
  
    async findById(id) {
      return await this.model.findByPk(id);
    }
  
    async create(data) {
      return await this.model.create(data);
    }
  
    async update(id, data) {
      const record = await this.findById(id);
      if (record) {
        return await record.update(data);
      }
      return null;
    }
  
    async delete(id) {
      const record = await this.findById(id);
      if (record) {
        await record.destroy();
        return true;
      }
      return false;
    }
  }
  
  module.exports = AbstractRepository;
  