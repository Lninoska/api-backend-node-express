const express = require('express');
const userController = require('../controllers/user.controller')
const { verifyToken } = require('../middleware/authmiddleware')
const router = express.Router()


router.post('/signup', userController.signup)

router.get('/user', userController.signin)

router.get('/user/:id', verifyToken, userController.findUserById)

router.get('/user', verifyToken, userController.findAll)

router.put('/user/:id', verifyToken, userController.updateUserById)

router.delete('/user/:id', verifyToken, userController.deleteUserById)

module.exports =  router 