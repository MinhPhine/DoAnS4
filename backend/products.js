const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    let filter = {};
    if (req.query.category) {
      // Lọc danh mục không phân biệt hoa thường
      filter.category = { $regex: new RegExp(`^${req.query.category}$`, 'i') };
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product (Admin and Creator only)
router.post('/', auth, checkRole(['admin', 'creator']), async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
