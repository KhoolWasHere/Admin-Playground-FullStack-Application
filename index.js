import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import router from './router.js';
import userModel from './models/userModel.js';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Set up EJS before routes
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'ultramaxx-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,      // Prevents JS access to cookie  }
}}));

app.get('/close', (req, res) => {
  res.send("<script>window.close();</script>");
});

// Auth middleware
app.use((req, res, next) => {
  if (req.session.user || req.path === '/login') {
    return next();
  }
  res.redirect('/login');
});


// Show login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login POST
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.validateUser(username, password);
  if (user) {
    req.session.user = { id: user.id, username: user.username };
    return res.redirect('/');
  }
  res.render('login', { error: 'Invalid credentials' });
});

// Handle logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Main page route
app.get('/', (_, res) => {
  res.render('terminal');
});

// Mount API router at root 
app.use('/', router);

app.listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});

