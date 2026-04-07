const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { auth, checkRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ status: 'published' })
      .populate('author', 'fullname email')
      .populate('category')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'fullname email');
    if (!article) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    // Tăng lượt xem
    article.views += 1;
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create article (Admin and Creator only)
router.post('/', auth, checkRole(['admin', 'creator']), async (req, res) => {
  try {
    const newArticle = new Article({ ...req.body, author: req.user.id });
    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
