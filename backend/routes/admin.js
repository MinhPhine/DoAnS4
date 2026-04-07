const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const User    = require('../models/User');
const Product = require('../models/Product');
const Article = require('../models/Article');
const Order   = require('../models/Order');
const Comment = require('../models/Comment');
const Review  = require('../models/Review');
const Video   = require('../models/Video');
const { logAction } = require('../utils/logger');

// ============ THỐNG KÊ TỔNG QUAN ============
router.get('/stats', auth, checkRole(['admin']), async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalArticles, totalOrders, totalComments, totalReviews, totalVideos] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Article.countDocuments(),
      Order.countDocuments(),
      Comment.countDocuments(),
      Review.countDocuments(),
      Video.countDocuments()
    ]);
    res.json({ totalUsers, totalProducts, totalArticles, totalOrders, totalComments, totalReviews, totalVideos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ NGƯỜI DÙNG ============
router.get('/users', auth, checkRole(['admin']), async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id/role', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin', 'creator'].includes(role)) {
      return res.status(400).json({ message: 'Role không hợp lệ' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    await logAction({ action: 'UPDATE_USER_ROLE', module: 'Users', details: `Đổi role ${user.email} → ${role}`, userId: req.user._id, ip: req.ip });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
    await logAction({ action: 'DELETE_USER', module: 'Users', details: `Xoá user: ${user.fullname} (${user.email})`, userId: req.user._id, ip: req.ip });
    res.json({ message: 'Đã xóa user thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ SẢN PHẨM ============
router.get('/products', auth, checkRole(['admin']), async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/products/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    await logAction({ action: 'DELETE_PRODUCT', module: 'Products', details: `Xoá sản phẩm: ${product.name}`, userId: req.user._id, ip: req.ip });
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/products/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    await logAction({ action: 'UPDATE_PRODUCT', module: 'Products', details: `Cập nhật sản phẩm: ${product.name}`, userId: req.user._id, ip: req.ip });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ BÀI VIẾT ============
router.get('/articles', auth, checkRole(['admin']), async (req, res) => {
  try {
    const articles = await Article.find({})
      .populate('author', 'fullname email')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/articles/:id/status', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body; // 'published' | 'draft' | 'hidden'
    const article = await Article.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!article) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    await logAction({ action: 'UPDATE_ARTICLE_STATUS', module: 'Articles', details: `Đổi trạng thái bài "${article.title?.slice(0,50)}" → ${status}`, userId: req.user._id, ip: req.ip });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/articles/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    await logAction({ action: 'DELETE_ARTICLE', module: 'Articles', details: `Xoá bài viết: "${article?.title?.slice(0,50)}"`, userId: req.user._id, ip: req.ip });
    res.json({ message: 'Đã xóa bài viết' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ COMMENT ============
router.get('/comments', auth, checkRole(['admin']), async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate('user', 'fullname email')
      .populate('article', 'title slug')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/comments/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    await logAction({ action: 'DELETE_COMMENT', module: 'Comments', details: `Xoá bình luận: "${comment?.content?.slice(0,60)}"`, userId: req.user._id, ip: req.ip });
    res.json({ message: 'Đã xóa comment' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ ĐÁNH GIÁ SẢN PHẨM ============
router.get('/reviews', auth, checkRole(['admin']), async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'fullname email')
      .populate('product', 'name slug')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/reviews/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    await logAction({ action: 'DELETE_REVIEW', module: 'Reviews', details: `Xoá đánh giá ${review?.rating}⭐: "${review?.comment?.slice(0,50)}"`, userId: req.user._id, ip: req.ip });
    res.json({ message: 'Đã xóa đánh giá' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ VIDEO ============
router.get('/videos', auth, checkRole(['admin']), async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate('author', 'fullname email')
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/videos/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    await logAction({ action: 'DELETE_VIDEO', module: 'Videos', details: `Xoá video: "${video?.title?.slice(0,60)}"`, userId: req.user._id, ip: req.ip });
    res.json({ message: 'Đã xóa video' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ QUẢN LÝ ĐƠN HÀNG ============
router.get('/orders', auth, checkRole(['admin']), async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'fullname email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/orders/:id/status', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
    }
    const update = { status };
    if (status === 'delivered') { update.isDelivered = true; update.deliveredAt = Date.now(); }
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    await logAction({ action: 'UPDATE_ORDER_STATUS', module: 'Orders', details: `Đổi trạng thái đơn hàng #${order._id?.toString().slice(-8).toUpperCase()} → ${status}`, userId: req.user._id, ip: req.ip });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ SYSTEM LOGS ============
router.get('/system-logs', auth, checkRole(['admin']), async (req, res) => {
  const SystemLog = require('../models/SystemLog');
  try {
    const logs = await SystemLog.find()
      .populate('user', 'fullname email')
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
