const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "auto",
        tl: "en",
        dt: "t",
        q: text
      }
    });

    const detectedLang = response.data[2];
    res.json({ language: detectedLang });
  } catch (err) {
    console.error("Language Detection Error:", err.message);
    res.status(500).json({ error: "Language detection failed" });
  }
});

module.exports = router;
