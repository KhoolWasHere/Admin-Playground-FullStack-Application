const saleModel = require('../models/saleModel');

// Only users with id 2 or 3 can view or create sales
function listSales(user) {
  if (user && (user.id === 2 || user.id === 1)) {
    return saleModel.getSalesReport();
  }
  throw new Error('Unauthorized');
}

function addSale(user, productId, quantity, soldAt) {
  if (user && (user.id === 2 || user.id === 1)) {
    return saleModel.recordSale(productId, quantity, soldAt);
  }
  throw new Error('Unauthorized');
}

module.exports = { listSales, addSale };