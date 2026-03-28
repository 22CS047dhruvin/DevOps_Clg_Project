const db = require('../models/db');

describe('Product Functions', () => {

  test('getAllProducts returns only active products', () => {
    const products = db.getAllProducts();
    expect(products.length).toBeGreaterThan(0);
    products.forEach(p => expect(p.active).toBe(true));
  });

  test('getProductById returns correct product', () => {
    const product = db.getProductById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
    expect(product.name).toContain('boAt');
  });

  test('getProductById returns undefined for invalid id', () => {
    const product = db.getProductById(9999);
    expect(product).toBeUndefined();
  });

  test('getProductsByCategory filters correctly', () => {
    const products = db.getProductsByCategory('Electronics');
    expect(products.length).toBeGreaterThan(0);
    products.forEach(p => expect(p.category).toBe('Electronics'));
  });

  test('searchProducts finds by name', () => {
    const results = db.searchProducts('boat');
    expect(results.length).toBeGreaterThan(0);
  });

  test('searchProducts returns empty for no match', () => {
    const results = db.searchProducts('xyznotexist123');
    expect(results).toHaveLength(0);
  });

  test('addProduct adds a new product', () => {
    const before = db.getAllProductsAdmin().length;
    db.addProduct({
      name: 'Test Product',
      description: 'Test description for unit test',
      price: '999',
      stock: '10',
      category: 'Electronics'
    });
    const after = db.getAllProductsAdmin().length;
    expect(after).toBe(before + 1);
  });

  test('deleteProduct marks product inactive', () => {
    const allBefore = db.getAllProductsAdmin();
    const target = allBefore[allBefore.length - 1];
    db.deleteProduct(target.id);
    const found = db.getProductById(target.id);
    expect(found.active).toBe(false);
  });

});

describe('Order Functions', () => {

  test('placeOrder creates a new order', () => {
    const before = db.getAllOrders().length;
    db.placeOrder('Riya Patel', 'riya@gmail.com', 'Vadodara, Gujarat - 390001', { '1': 1 });
    const after = db.getAllOrders().length;
    expect(after).toBe(before + 1);
  });

  test('placeOrder calculates total correctly', () => {
    const product = db.getProductById(1);
    const order = db.placeOrder('Arjun Shah', 'arjun@test.com', 'Surat, Gujarat', { '1': 2 });
    expect(order.totalAmount).toBe(product.price * 2);
  });

  test('placeOrder reduces product stock', () => {
    const product = db.getProductById(4);
    const stockBefore = product.stock;
    db.placeOrder('Test User', 'test@test.com', 'Mumbai', { '4': 1 });
    expect(product.stock).toBe(stockBefore - 1);
  });

  test('getOrdersByEmail returns correct orders', () => {
    db.placeOrder('Dev Joshi', 'dev@kset.edu', 'Vadodara', { '6': 1 });
    const orders = db.getOrdersByEmail('dev@kset.edu');
    expect(orders.length).toBeGreaterThan(0);
    orders.forEach(o => expect(o.customerEmail).toBe('dev@kset.edu'));
  });

  test('updateOrderStatus changes status', () => {
    const order = db.placeOrder('Status Test', 'status@test.com', 'Test City', { '7': 1 });
    db.updateOrderStatus(order.id, 'SHIPPED');
    const updated = db.getOrderById(order.id);
    expect(updated.status).toBe('SHIPPED');
  });

  test('getStats returns correct counts', () => {
    const stats = db.getStats();
    expect(stats.totalProducts).toBeGreaterThan(0);
    expect(stats.totalOrders).toBeGreaterThan(0);
    expect(stats.totalRevenue).toBeGreaterThan(0);
  });

});
