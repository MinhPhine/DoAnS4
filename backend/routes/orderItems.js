const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');
const { auth } = require('../middleware/auth');

router.get('/:orderId', auth, async (req, res) => {
  try {
    const items = await OrderItem.find({ order: req.params.orderId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const item = new OrderItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
