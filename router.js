const express = require('express');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController');
const saleController = require('./controllers/saleController');

const router = express.Router();

// Only users with id 1 or 3 can view/create products
router.get('/products', (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const products = productController.listProducts(req.session.user);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/products', (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const { name, desc, catID } = req.body;
    productController.addProduct(req.session.user, name, desc, catID);
    res.json({ message: 'Product created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// Only users with id 1 or 3 can view/create categories
router.get('/categories', (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const categories = categoryController.listCategories(req.session.user);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categories', (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const { name, desc } = req.body;
    categoryController.addCategory(req.session.user, name, desc);
    res.json({ message: 'Category created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Only users with id 1 or 2 can view/create sales
router.get('/sales', (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 2)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const sales = saleController.listSales(req.session.user);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sales', (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 2)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const { productId, quantity, soldAt } = req.body;
    saleController.addSale(req.session.user, productId, quantity, soldAt);
    res.json({ message: 'Sale recorded!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
