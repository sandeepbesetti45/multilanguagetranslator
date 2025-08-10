const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const History = require('../models/History');


router.post('/add', verifyToken, async (req, res) => {
  const { originalText, translatedText, targetLang } = req.body;

  if (!originalText || !translatedText || !targetLang) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newHistory = new History({
      originalText,
      translatedText,
      targetLang,
      user: req.user.id,
      date: new Date()
    });

    await newHistory.save();
    res.json({ message: 'Saved to history' });
  } catch (err) {
    console.error('Error saving history:', err.message);
    res.status(500).json({ error: 'Failed to save history' });
  }
});


router.get('/', verifyToken, async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    console.error('Error fetching history:', err.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;