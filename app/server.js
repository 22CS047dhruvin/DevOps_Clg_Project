const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Session
app.use(session({
  secret: 'shopease-secret-vedarth-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Flash messages
app.use(flash());

// Global locals for all views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.cartCount = req.session.cart
    ? Object.keys(req.session.cart).length
    : 0;
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// Routes
app.use('/', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  ShopEase - E-Commerce Platform');
  console.log('  Testing for DevOps Practitioning');
  console.log('========================================');
  console.log(`  Store   : http://localhost:${PORT}/`);
  console.log(`  Admin   : http://localhost:${PORT}/admin`);
  console.log(`  Login   : admin / admin123`);
  console.log('========================================');
});

module.exports = app;
