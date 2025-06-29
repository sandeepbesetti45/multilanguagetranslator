const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  targetLang: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', historySchema);
