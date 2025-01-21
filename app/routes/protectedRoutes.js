const express = require('express');
const verifyToken = require('../middleware/authmiddleware')
const { protectedData } = require('../controllers/protectedController')
const router = express.Router()

router.get('/data', verifyToken, protectedData);

module.exports = router 