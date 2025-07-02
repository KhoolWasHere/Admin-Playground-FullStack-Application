const saleModel = require('../models/saleModel');

// Only users with id 2 or 1 can view or create sales
async function listSales(user) {
  if (user && (user.id === 2 || user.id === 1)) {
    return await saleModel.getSalesReport();
  }
  throw new Error('Unauthorized');
}

async function addSale(user, product_id, quantity, sold_at) {
  if (user && (user.id === 2 || user.id === 1)) {
    return await saleModel.recordSale(product_id, quantity, sold_at);
  }
  throw new Error('Unauthorized');
}

module.exports = { listSales, addSale };