const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });
    cart.items = req.body.items;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
