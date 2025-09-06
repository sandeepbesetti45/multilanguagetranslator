const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const translateRoutes = require('./routes/translate');
const historyRoutes = require('./routes/history');
const detectRoute = require('./routes/detect');

const app = express();

// Middleware
app.use(express.json());

// Allow all origins (for local + any device testing)
app.use(cors({
  origin: true,       // ✅ allows all origins
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/detect', detectRoute);

// Root test route
app.get('/', (req, res) => res.send('🌍 Multilanguage Translator Backend Running!'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
