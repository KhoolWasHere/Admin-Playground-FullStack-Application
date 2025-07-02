const categoryModel = require('../models/categoryModel');

// Only users with id 1 or 3 can view or create categories
async function listCategories(user) {
  if (user && (user.id === 1 || user.id === 3)) {
    return await categoryModel.getAllCategories();
  }
  throw new Error('Unauthorized');
}

async function addCategory(user, name, desc) {
  if (user && (user.id === 1 || user.id === 3)) {
    return await categoryModel.createCategory(name, desc);
  }
  throw new Error('Unauthorized');
}

async function categoryEdit(user, id, name, desc) {
  if (user && (user.id === 1 || user.id === 3)) {
    return await categoryModel.editCategory(id, name, desc);
  }
  throw new Error('Unauthorized');
}

module.exports = { listCategories, addCategory, categoryEdit };