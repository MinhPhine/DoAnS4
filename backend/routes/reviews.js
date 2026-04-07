const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { auth } = require('../middleware/auth');

// Lấy reviews theo productId
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'fullname email')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy tất cả reviews (cho review-detail page)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'fullname email')
      .populate('product', 'name slug images')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo review mới
router.post('/', auth, async (req, res) => {
  try {
    const review = new Review({ ...req.body, user: req.user.id });
    await review.save();
    const populated = await Review.findById(review._id)
      .populate('user', 'fullname email')
      .populate('product', 'name slug images');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

