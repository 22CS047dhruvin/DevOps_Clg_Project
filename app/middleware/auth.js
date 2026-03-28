function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  req.flash('error', 'Please login to access admin panel.');
  res.redirect('/auth/login');
}

module.exports = { requireAdmin };
