const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const translateRoutes = require('./routes/translate');
const historyRoutes = require('./routes/history');
const detectRoute = require('./routes/detect'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/detect', detectRoute); 

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
