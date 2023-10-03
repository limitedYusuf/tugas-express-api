const express = require('express');
// import other
const { handleLogin, handleCheckLogin, handleLogout } = require('../handlers/authHandler');
const { validateAuth } = require('../validators/authValidator');

const router = express.Router();

// API untuk login
router.post('/login', validateAuth, handleLogin);

// API untuk logout
router.get('/logout', handleLogout);

// API untuk memeriksa status login
router.get('/check-login', handleCheckLogin);

module.exports = router;
