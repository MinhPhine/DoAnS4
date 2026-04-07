const express = require('express');
const router = express.Router();
const SystemLog = require('../models/SystemLog');
const { auth, checkRole } = require('../middleware/auth');

router.get('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    // Only admins should see logs (simplified check for now)
    const logs = await SystemLog.find().sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const log = new SystemLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
