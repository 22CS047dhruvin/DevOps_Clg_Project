// In-memory database - no MySQL/MongoDB setup needed
// Data resets on server restart (perfect for demo/college submission)

let products = [
  { id: 1, name: 'boAt Rockerz 450 Bluetooth Headphone', description: 'Over-ear wireless headphone with 15 hours playback, 40mm drivers and soft padded earcups. Compatible with all Bluetooth devices. Comes with aux cable.', price: 1299, stock: 85, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', active: true },
  { id: 2, name: 'Redmi 13C 4G Smartphone 128GB', description: '6.74 inch HD+ display, 50MP AI triple camera, 5000mAh battery, MediaTek Helio G85 processor. Available in Startrail Black and Startrail Green.', price: 9499, stock: 40, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', active: true },
  { id: 3, name: 'Noise ColorFit Pro 4 Smartwatch', description: '1.72 inch TFT display, SpO2 and heart rate monitor, 100+ sports modes, IP68 water resistant, 7 day battery life. BT calling enabled.', price: 2199, stock: 60, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', active: true },
  { id: 4, name: 'Portronics Toad 23 Wireless Mouse', description: '2.4GHz wireless connectivity, 1600 DPI optical sensor, plug and play USB nano receiver, 12 months battery life. Ergonomic design for long usage.', price: 349, stock: 150, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', active: true },
  { id: 5, name: 'Zebronics ZEB-K35 USB Keyboard', description: 'Full size wired USB keyboard with rupee key, spill resistant design, 104 keys, plug and play. Compatible with Windows, Linux and Mac.', price: 449, stock: 120, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', active: true },
  { id: 6, name: "Jockey Men's Cotton Round Neck T-Shirt", description: '100% super combed cotton, bio-washed fabric for extra softness. Regular fit, ribbed collar with stay-fresh treatment. Available in S, M, L, XL, XXL.', price: 399, stock: 300, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', active: true },
  { id: 7, name: "Peter England Men's Slim Fit Formal Shirt", description: 'Premium cotton blend formal shirt with wrinkle-free finish. Full sleeves, spread collar, suitable for office and semi-formal occasions.', price: 799, stock: 180, category: 'Clothing', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', active: true },
  { id: 8, name: "W Women's Kurta Set with Dupatta", description: 'Printed straight kurta with palazzo pants and matching dupatta. Machine washable rayon fabric. Festive and casual wear. Sizes XS to 3XL.', price: 1199, stock: 90, category: 'Clothing', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400', active: true },
  { id: 9, name: "Bata Men's Casual Sneakers", description: 'Lightweight EVA sole, mesh upper for breathability, cushioned insole for all day comfort. Lace-up closure. Available in sizes 6 to 11.', price: 1499, stock: 110, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', active: true },
  { id: 10, name: "Relaxo Flite Men's Daily Wear Slippers", description: 'Lightweight EVA material, anti-skid textured sole, comfortable footbed. Daily wear Hawaii chappals. Available in sizes 6 to 11.', price: 249, stock: 400, category: 'Footwear', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400', active: true },
  { id: 11, name: 'Milton Thermosteel Flask 1 Litre', description: 'Double wall stainless steel vacuum insulated flask. Keeps beverages hot for 24 hours and cold for 24 hours. Leak proof, rust free body.', price: 699, stock: 200, category: 'Kitchen', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', active: true },
  { id: 12, name: 'Prestige Aluminium Pressure Cooker 5 Litre', description: 'ISI certified, weight valve with safety plug, compatible with gas and induction stove. Comes with 5 year warranty.', price: 1349, stock: 70, category: 'Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', active: true },
  { id: 13, name: 'Skybags Footloose Laptop Backpack 30L', description: 'Water resistant polyester, dedicated 15.6 inch laptop compartment, USB charging port, multiple organiser pockets. 2 year brand warranty.', price: 1799, stock: 65, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', active: true },
  { id: 14, name: 'Nivia Storm Football Size 5', description: '32 panel machine stitched PVC football. Size 5 as per FIFA standards. Suitable for practice and recreational play on all surfaces.', price: 499, stock: 95, category: 'Sports', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', active: true },
  { id: 15, name: 'Boldfit Yoga Mat 6mm Anti-Slip', description: 'TPE eco-friendly material, double sided non-slip texture, moisture resistant. Includes carrying strap. 183cm x 61cm. 1 year warranty.', price: 799, stock: 80, category: 'Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', active: true },
  { id: 16, name: 'Classmate 6 Subject Spiral Notebook A4', description: '180 pages, single line ruling, micro perforated pages, stiff cardboard back cover. Suitable for college and school students.', price: 129, stock: 500, category: 'Stationery', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400', active: true },
  { id: 17, name: 'Parker Beta Premium Ball Pen Pack of 5', description: 'Medium tip 1.0mm, smooth flow blue ink, ergonomic rubber grip, stainless steel tip. Suitable for exams, office and daily writing.', price: 199, stock: 600, category: 'Stationery', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400', active: true },
];

let orders = [];
let nextOrderId = 1001;
let nextProductId = 18;

// Product functions
function getAllProducts() {
  return products.filter(p => p.active);
}

function getAllProductsAdmin() {
  return [...products];
}

function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  return products.filter(p => p.active && p.category === category);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(p => p.active && p.name.toLowerCase().includes(q));
}

function addProduct(data) {
  const product = {
    id: nextProductId++,
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    stock: parseInt(data.stock),
    category: data.category,
    image: data.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400',
    active: true
  };
  products.push(product);
  return product;
}

function updateProduct(id, data) {
  const idx = products.findIndex(p => p.id === parseInt(id));
  if (idx === -1) return null;
  products[idx] = {
    ...products[idx],
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    stock: parseInt(data.stock),
    category: data.category,
    image: data.image || products[idx].image,
    active: data.active !== undefined ? data.active : products[idx].active
  };
  return products[idx];
}

function deleteProduct(id) {
  const idx = products.findIndex(p => p.id === parseInt(id));
  if (idx !== -1) products[idx].active = false;
}

// Order functions
function placeOrder(name, email, address, cartItems) {
  let total = 0;
  const items = [];

  for (const [productId, qty] of Object.entries(cartItems)) {
    const product = getProductById(productId);
    if (!product) throw new Error('Product not found: ' + productId);
    if (product.stock < qty) throw new Error('Insufficient stock for: ' + product.name);

    product.stock -= qty;
    items.push({
      productId: product.id,
      productName: product.name,
      quantity: qty,
      unitPrice: product.price,
      subtotal: product.price * qty
    });
    total += product.price * qty;
  }

  const order = {
    id: nextOrderId++,
    customerName: name,
    customerEmail: email,
    shippingAddress: address,
    items,
    totalAmount: total,
    status: 'PENDING',
    orderDate: new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  };
  orders.push(order);
  return order;
}

function getAllOrders() {
  return [...orders].reverse();
}

function getOrderById(id) {
  return orders.find(o => o.id === parseInt(id));
}

function getOrdersByEmail(email) {
  return orders.filter(o => o.customerEmail.toLowerCase() === email.toLowerCase()).reverse();
}

function updateOrderStatus(id, status) {
  const order = orders.find(o => o.id === parseInt(id));
  if (order) order.status = status;
  return order;
}

function getStats() {
  const totalRevenue = orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  return {
    totalProducts: products.filter(p => p.active).length,
    totalOrders: orders.length,
    totalRevenue,
    pendingOrders: orders.filter(o => o.status === 'PENDING').length
  };
}

const CATEGORIES = ['Electronics', 'Clothing', 'Footwear', 'Kitchen', 'Bags', 'Sports', 'Stationery'];
const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

module.exports = {
  getAllProducts, getAllProductsAdmin, getProductById,
  getProductsByCategory, searchProducts,
  addProduct, updateProduct, deleteProduct,
  placeOrder, getAllOrders, getOrderById,
  getOrdersByEmail, updateOrderStatus, getStats,
  CATEGORIES, ORDER_STATUSES
};
