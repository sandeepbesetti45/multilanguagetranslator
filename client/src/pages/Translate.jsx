import { useState, useEffect } from 'react';
import axios from 'axios';

const Translate = () => {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [languages, setLanguages] = useState([]);
  const [detectedLang, setDetectedLang] = useState('');
  const [theme, setTheme] = useState('dark');

  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  const langOptions = {
    en: 'English',
    hi: 'Hindi',
    fr: 'French',
    es: 'Spanish',
    ar: 'Arabic',
    de: 'German',
    ru: 'Russian',
    ja: 'Japanese',
    zh: 'Chinese',
    te: 'Telugu',
    ta: 'Tamil',
    bn: 'Bengali',
    it: 'Italian',
    pt: 'Portuguese',
    tr: 'Turkish',
    pl: 'Polish',
    uk: 'Ukrainian',
    nl: 'Dutch',
    el: 'Greek',
    sv: 'Swedish',
    hu: 'Hungarian',
    ro: 'Romanian',
    cs: 'Czech',
    da: 'Danish',
    fi: 'Finnish',
    he: 'Hebrew',
    th: 'Thai',
    ko: 'Korean',
    no: 'Norwegian',
    fa: 'Persian',
    vi: 'Vietnamese',
    ms: 'Malay',
    id: 'Indonesian',
    ur: 'Urdu',
    gu: 'Gujarati',
    kn: 'Kannada',
    ml: 'Malayalam',
    mr: 'Marathi',
    pa: 'Punjabi',
    sw: 'Swahili',
    sr: 'Serbian',
    hr: 'Croatian',
    sk: 'Slovak',
    sl: 'Slovenian',
    bg: 'Bulgarian',
    lt: 'Lithuanian',
    lv: 'Latvian',
    et: 'Estonian'
  };

  useEffect(() => {
    setLanguages(Object.entries(langOptions));
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleTranslate = async () => {
    if (!text.trim()) return alert('Enter text to translate');

    try {
      const res = await axios.post(
        `${API_URL}/api/translate`,
        { text, targetLang },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.translatedText) {
        setTranslated(res.data.translatedText);

        await axios.post(
          `${API_URL}/api/history/add`,
          {
            originalText: text,
            translatedText: res.data.translatedText,
            targetLang,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        alert("No translation returned. Please try again.");
      }
    } catch (err) {
      console.error('Translation failed:', err.response?.data || err.message);
      alert('Translation failed. Try again.');
    }
  };

  const handleDetect = async () => {
    if (!text.trim()) return alert('Enter text to detect language');

    try {
      const res = await axios.post(`${API_URL}/api/detect`, { text });
      setDetectedLang(langOptions[res.data.language] || res.data.language);
    } catch (err) {
      console.error('Detection failed:', err.response?.data || err.message);
      alert('Language detection failed. Try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-400">🌐 Translate Text</h2>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 rounded bg-gray-700 text-sm hover:bg-gray-600"
        >
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <textarea
        rows="5"
        placeholder="Enter your paragraph here..."
        className="w-full p-4 rounded bg-gray-800 text-white mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <label className="text-sm">Translate To:</label>
        <select
          className="bg-gray-700 p-2 rounded text-white max-h-48 overflow-auto"
          style={{ position: 'relative', zIndex: 10 }}
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languages.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={handleTranslate}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Translate
        </button>
        <button
          onClick={handleDetect}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Detect Language
        </button>
      </div>

      {detectedLang && (
        <div className="mb-4 text-yellow-400">
          Detected Language: <strong>{detectedLang}</strong>
        </div>
      )}

      {translated && (
        <div className="bg-gray-800 p-4 rounded text-green-400">
          <h3 className="font-semibold">Translated Output:</h3>
          <p>{translated}</p>
        </div>
      )}
    </div>
  );
};

export default Translate;
