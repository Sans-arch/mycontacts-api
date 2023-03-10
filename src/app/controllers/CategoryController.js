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

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const categoryByName = await CategoryRepository.findByName(name);

    if (categoryByName && categoryByName.id !== id) {
      return response.status(404).json({ error: 'A category with this name is already in use' });
    }

    const updatedCategory = await CategoryRepository.update(id, { name });

    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoryRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();
