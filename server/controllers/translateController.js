const axios = require('axios');

exports.translateText = async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });

  try {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: { client: 'gtx', sl: 'auto', tl: targetLang, dt: 't', q: text }
    });

    const translatedText = response.data[0].map(segment => segment[0]).join('');
    res.json({ translatedText });
  } catch (err) {
    console.error('Translation error:', err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
};
