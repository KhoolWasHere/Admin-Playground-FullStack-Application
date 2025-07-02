import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import router from './router.js';
import userModel from './models/userModel.js';
import session from 'express-session';
import productController from './controllers/productController.js';
import categoryController from './controllers/categoryController.js';
import saleController from './controllers/saleController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

  const _AdminUserName = "AdministratorAdministrates";
  const _AdminPassword = "LilYaghtyDunksSuck"

const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('assets'));

app.use(session({
  secret: 'ultramaxx-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
  }
}));

app.get('/close', (req, res) => {
  res.send("<script>window.close();</script>");
});

app.use((req, res, next) => {
  if (req.session.user || req.path === '/login') {
    return next();
  }
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.validateUser(username, password);
  if (user) {
    req.session.user = { id: user.id, username: user.username };
    return res.redirect('/');
  }
  res.render('login', { error: 'Invalid credentials' });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

app.get('/', (_, res) => {
  res.render('terminal');
});

app.use('/', router);

app.post('/edit-product', async (req, res) => {
  const { id, name, description, category_id } = req.body;

  try {
    await productController.productEdit(req.session.user, id, name, description, category_id);
    
    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
});

app.post('/add-product', async (req, res) => {
  const { name, description, category_id } = req.body;

  try {
    await productController.addProduct(req.session.user, name, description, category_id);
    
    res.status(200).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to Add product', error: error.message });
  }
});

app.post('/edit-category', async (req, res) => {
  const { id, name, description} = req.body;

  try {
    await categoryController.categoryEdit(req.session.user, id, name, description);
    
    res.status(200).json({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update Category', error: error.message });
  }
});

app.post('/add-category', async (req, res) => {
  const { name, description} = req.body;

  try {
    await categoryController.addCategory(req.session.user, name, description);
    
    res.status(200).json({ success: true, message: 'Category added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to Add Category', error: error.message });
  }
});

app.post('/add-sale', async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    await saleController.addSale(req.session.user, product_id, quantity);
    
    res.status(200).json({ success: true, message: 'Sale added successfully' });
  } catch (error) {
    console.error('Error adding sale:', error);
    res.status(500).json({ success: false, message: 'Failed to Add Sale', error: error.message });
  }
});

function renderTemplate(templatePath, data) {
  const ejs = require('ejs');
  const fs = require('fs');
  const template = fs.readFileSync(templatePath, 'utf-8');
  return ejs.render(template, data);
}

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});
