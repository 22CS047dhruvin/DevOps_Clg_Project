const express = require('express');
const router = express.Router();

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// GET /auth/login
router.get('/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin');
  res.render('login', { title: 'Admin Login' });
});

// POST /auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    req.flash('success', 'Welcome back, Admin!');
    res.redirect('/admin');
  } else {
    req.flash('error', 'Invalid username or password.');
    res.redirect('/auth/login');
  }
});

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
