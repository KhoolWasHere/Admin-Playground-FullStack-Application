const productModel = require('../models/productModel');

// Only users with id 1 or 3 can view or create products
async function listProducts(user) {
  if (user && (user.id === 1 || user.id === 3)) {
    return await productModel.getAllProducts();
  }
  throw new Error('Unauthorized');
}

async function addProduct(user, name, desc, catID) {
  if (user && (user.id === 1 || user.id === 3)) {
    return await productModel.createProduct(name, desc, catID);
  }
  throw new Error('Unauthorized');
}

async function productEdit(user, id, name, desc, catID) {
  if (user && (user.id === 1 || user.id === 3)) {
    return await productModel.editProduct(id, name, desc, catID);
  }
  throw new Error('Unauthorized');
}

module.exports = { listProducts, addProduct, productEdit };