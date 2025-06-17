const categoryModel = require('../models/categoryModel');

// Only users with id 1 or 3 can view or create categories
function listCategories(user) {
  if (user && (user.id === 1 || user.id === 3)) {
    return categoryModel.getAllCategories();
  }
  throw new Error('Unauthorized');
}

function addCategory(user, name, desc) {
  if (user && (user.id === 1 || user.id === 3)) {
    return categoryModel.createCategory(name, desc);
  }
  throw new Error('Unauthorized');
}

module.exports = { listCategories, addCategory };