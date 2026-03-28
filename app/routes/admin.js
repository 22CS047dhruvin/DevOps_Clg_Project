const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { requireAdmin } = require('../middleware/auth');

// All admin routes require login
router.use(requireAdmin);

// GET /admin - Dashboard
router.get('/', (req, res) => {
  const stats = db.getStats();
  const recentOrders = db.getAllOrders().slice(0, 5);
  res.render('admin/dashboard', {
    title: 'Admin Dashboard - ShopEase',
    stats,
    recentOrders,
    statuses: db.ORDER_STATUSES
  });
});

// GET /admin/products
router.get('/products', (req, res) => {
  res.render('admin/products', {
    title: 'Manage Products - ShopEase',
    products: db.getAllProductsAdmin()
  });
});

// GET /admin/products/new
router.get('/products/new', (req, res) => {
  res.render('admin/product-form', {
    title: 'Add Product - ShopEase',
    product: {},
    isNew: true,
    categories: db.CATEGORIES
  });
});

// POST /admin/products/add
router.post('/products/add', (req, res) => {
  try {
    db.addProduct(req.body);
    req.flash('success', 'Product added successfully!');
  } catch (e) {
    req.flash('error', 'Failed to add product.');
  }
  res.redirect('/admin/products');
});

// GET /admin/products/edit/:id
router.get('/products/edit/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) return res.redirect('/admin/products');
  res.render('admin/product-form', {
    title: 'Edit Product - ShopEase',
    product,
    isNew: false,
    categories: db.CATEGORIES
  });
});

// POST /admin/products/update/:id
router.post('/products/update/:id', (req, res) => {
  try {
    db.updateProduct(req.params.id, req.body);
    req.flash('success', 'Product updated successfully!');
  } catch (e) {
    req.flash('error', 'Failed to update product.');
  }
  res.redirect('/admin/products');
});

// POST /admin/products/delete/:id
router.post('/products/delete/:id', (req, res) => {
  db.deleteProduct(req.params.id);
  req.flash('success', 'Product deleted!');
  res.redirect('/admin/products');
});

// GET /admin/orders
router.get('/orders', (req, res) => {
  res.render('admin/orders', {
    title: 'Manage Orders - ShopEase',
    orders: db.getAllOrders(),
    statuses: db.ORDER_STATUSES
  });
});

// GET /admin/orders/:id
router.get('/orders/:id', (req, res) => {
  const order = db.getOrderById(req.params.id);
  if (!order) return res.redirect('/admin/orders');
  res.render('admin/order-detail', {
    title: 'Order #' + order.id + ' - ShopEase',
    order,
    statuses: db.ORDER_STATUSES
  });
});

// POST /admin/orders/:id/status
router.post('/orders/:id/status', (req, res) => {
  db.updateOrderStatus(req.params.id, req.body.status);
  req.flash('success', 'Order status updated!');
  res.redirect('/admin/orders/' + req.params.id);
});

module.exports = router;
