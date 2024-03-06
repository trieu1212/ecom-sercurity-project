const express = require('express');
const AuthController = require('../controllers/AuthController');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/register',AuthController.registerUser)
router.post('/login',AuthController.loginUser)
router.post('/refresh',AuthController.refresh)
router.post('/logout',MiddlewareController.verifyToken,AuthController.logoutUser)
module.exports = router;