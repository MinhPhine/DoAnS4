const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const address = new Address({ ...req.body, user: req.user.id });
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
