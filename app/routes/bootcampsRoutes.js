const express = require('express');
const bootcampController = require('../controllers/bootcamp.controller')
const { verifyToken } = require('../middleware/authmiddleware')
const router = express.Router()

router.post('/bootcamp', verifyToken, bootcampController.createBootcamp)

router.post('/bootcamp/adduser', verifyToken, bootcampController.addUser)

router.get('bootcamp/:id', verifyToken, bootcampController.getBootcampById)

router.get('/bootcamp', bootcampController.getBootcamp)

module.exports = router