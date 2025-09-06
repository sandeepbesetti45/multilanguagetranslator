const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

  try {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: { client: 'gtx', sl: 'auto', tl: 'en', dt: 't', q: text }
    });
    const detectedLang = response.data[2];
    res.json({ language: detectedLang });
  } catch (err) {
    console.error('Detection error:', err.message);
    res.status(500).json({ error: 'Language detection failed' });
  }
});

module.exports = router;
