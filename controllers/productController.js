const productModel = require('../models/productModel');

// Only users with id 1 or 3 can view or create products
function listProducts(user) {
  if (user && (user.id === 1 || user.id === 3)) {
    return productModel.getAllProducts();
  }
  throw new Error('Unauthorized');
}

function addProduct(user, name, desc, catID) {
  if (user && (user.id === 1 || user.id === 3)) {
    return productModel.createProduct(name, desc, catID);
  }
  throw new Error('Unauthorized');
}

module.exports = { listProducts, addProduct };