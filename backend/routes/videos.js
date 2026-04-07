const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { auth } = require('../middleware/auth');

// Lấy tất cả videos (published)
router.get('/', async (req, res) => {
  try {
    const filter = { status: 'published' };
    if (req.query.category) filter.category = req.query.category;
    const videos = await Video.find(filter)
      .populate('author', 'fullname')
      .populate('product', 'name slug images')
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy video theo slug
router.get('/:slug', async (req, res) => {
  try {
    const video = await Video.findOne({ slug: req.params.slug })
      .populate('author', 'fullname')
      .populate('product', 'name slug images specs');
    if (!video) return res.status(404).json({ message: 'Không tìm thấy video' });
    video.views += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tạo video (admin)
router.post('/', auth, async (req, res) => {
  try {
    const video = new Video({ ...req.body, author: req.user.id });
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
