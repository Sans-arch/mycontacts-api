const idValidator = require('uuid-validate');
const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    return response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const isValidId = idValidator(id);

    if (!isValidId) {
      return response.status(400).json({ error: 'Invalid id' });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const category = await CategoryRepository.create({ name });
    return response.json(category);
  }
}

module.exports = new CategoryController();
