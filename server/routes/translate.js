const express = require('express');
const { translateText } = require('../controllers/translateController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, translateText);

module.exports = router;
