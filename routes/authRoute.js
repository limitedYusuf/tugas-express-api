const express = require('express');
const router = express.Router();
const { handleLogin, handleCheckLogin, handleLogout } = require('../handlers/authHandler');

// API untuk login
router.post('/login', handleLogin);

// API untuk logout
router.get('/logout', handleLogout);

// API untuk memeriksa status login
router.get('/check-login', handleCheckLogin);

module.exports = router;
