const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET / - Home / Product listing
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let products;
  let selectedCategory = null;
  let searchQuery = null;

  if (search && search.trim()) {
    products = db.searchProducts(search.trim());
    searchQuery = search.trim();
  } else if (category && category.trim()) {
    products = db.getProductsByCategory(category.trim());
    selectedCategory = category.trim();
  } else {
    products = db.getAllProducts();
  }

  res.render('shop/home', {
    title: 'ShopEase - India ka Smart Bazaar',
    products,
    categories: db.CATEGORIES,
    selectedCategory,
    searchQuery
  });
});

// GET /product/:id - Product detail
router.get('/product/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product || !product.active) {
    return res.redirect('/');
  }
  res.render('shop/product-detail', {
    title: product.name + ' - ShopEase',
    product
  });
});

// POST /cart/add - Add to cart
router.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  const qty = parseInt(quantity) || 1;

  if (!req.session.cart) req.session.cart = {};
  const id = productId.toString();
  req.session.cart[id] = (req.session.cart[id] || 0) + qty;

  req.flash('success', 'Item added to cart!');
  res.redirect('back');
});

// GET /cart - View cart
router.get('/cart', (req, res) => {
  const cart = req.session.cart || {};
  const cartItems = [];
  let total = 0;

  for (const [id, qty] of Object.entries(cart)) {
    const product = db.getProductById(id);
    if (product) {
      const subtotal = product.price * qty;
      cartItems.push({ product, quantity: qty, subtotal });
      total += subtotal;
    }
  }

  res.render('shop/cart', {
    title: 'Your Cart - ShopEase',
    cartItems,
    total
  });
});

// POST /cart/remove - Remove from cart
router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;
  if (req.session.cart) delete req.session.cart[productId.toString()];
  res.redirect('/cart');
});

// POST /cart/clear - Clear cart
router.post('/cart/clear', (req, res) => {
  req.session.cart = {};
  res.redirect('/cart');
});

// GET /checkout - Checkout page
router.get('/checkout', (req, res) => {
  const cart = req.session.cart || {};
  if (Object.keys(cart).length === 0) return res.redirect('/cart');
  res.render('shop/checkout', { title: 'Checkout - ShopEase' });
});

// POST /checkout/place - Place order
router.post('/checkout/place', (req, res) => {
  const { name, email, address } = req.body;
  const cart = req.session.cart || {};

  if (Object.keys(cart).length === 0) return res.redirect('/cart');

  try {
    const order = db.placeOrder(name, email, address, cart);
    req.session.cart = {};
    req.session.lastOrderId = order.id;
    req.session.lastOrderTotal = order.totalAmount;
    res.redirect('/order-success');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/checkout');
  }
});

// GET /order-success
router.get('/order-success', (req, res) => {
  const orderId = req.session.lastOrderId;
  const orderTotal = req.session.lastOrderTotal;
  if (!orderId) return res.redirect('/');
  delete req.session.lastOrderId;
  delete req.session.lastOrderTotal;
  res.render('shop/order-success', {
    title: 'Order Placed! - ShopEase',
    orderId,
    orderTotal
  });
});

// GET /track-order
router.get('/track-order', (req, res) => {
  const { email } = req.query;
  let orders = [];
  if (email && email.trim()) {
    orders = db.getOrdersByEmail(email.trim());
  }
  res.render('shop/track-order', {
    title: 'Track Order - ShopEase',
    orders,
    email: email || ''
  });
});

module.exports = router;
