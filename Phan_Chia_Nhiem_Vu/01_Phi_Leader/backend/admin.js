const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Article = require('../models/Article');
const Order = require('../models/Order');

// ============ THỐNG KÊ TỔNG QUAN ============
router.get('/stats', auth, checkRole(['admin']), async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalArticles, totalOrders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Article.countDocuments(),
      Order.countDocuments()
    ]);
    res.json({ totalUsers, totalProducts, totalArticles, totalOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ NGƯỜI DÙNG ============
// Lấy tất cả users
router.get('/users', auth, checkRole(['admin']), async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật role user
router.put('/users/:id/role', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin', 'creator'].includes(role)) {
      return res.status(400).json({ message: 'Role không hợp lệ' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa user
router.delete('/users/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    res.json({ message: 'Đã xóa user thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ SẢN PHẨM ============
// Lấy tất cả sản phẩm
router.get('/products', auth, checkRole(['admin']), async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa sản phẩm
router.delete('/products/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật sản phẩm
router.put('/products/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
