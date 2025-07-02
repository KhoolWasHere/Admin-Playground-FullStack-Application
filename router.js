const express = require('express');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/categoryController');
const saleController = require('./controllers/saleController');

const router = express.Router();

// Only users with id 1 or 3 can view/create products
router.get('/products', async (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const products = await productController.listProducts(req.session.user);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/products', async (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const { name, desc, catID } = req.body;
    await productController.addProduct(req.session.user, name, desc, catID);
    res.json({ message: 'Product created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Only users with id 1 or 3 can view/create categories
router.get('/categories', async (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const categories = await categoryController.listCategories(req.session.user);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/categories', async (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 3)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const { name, desc } = req.body;
    await categoryController.addCategory(req.session.user, name, desc);
    res.json({ message: 'Category created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/sales', async (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 2)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const sales = await saleController.listSales(req.session.user);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/sales', async (req, res) => {
  if (!req.session.user || (req.session.user.id !== 1 && req.session.user.id !== 2)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const product_id = req.body.product_id || req.body.productId;
    const quantity = req.body.quantity;
    const sold_at = req.body.sold_at || req.body.soldAt || new Date().toISOString();
    const result = await saleController.addSale(req.session.user, product_id, quantity, sold_at);
    res.json({ message: 'Sale recorded!', ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tables', async (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const products = await productController.listProducts(req.session.user);
    const categories = await categoryController.listCategories(req.session.user);
    const sales = await saleController.listSales(req.session.user);
    res.render('TablesUI', { products: products, categories: categories, sales: sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
