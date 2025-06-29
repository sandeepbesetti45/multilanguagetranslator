const express = require('express');
const router = express.Router();
const { translateText } = require('../controllers/translateController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, translateText);

module.exports = router;
