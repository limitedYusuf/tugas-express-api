const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/configToken');

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization') || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Tidak ada token' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' });
    }

    req.user = {
      id: user.userId
    };
    next();
  });
}

function setupToken(req, res, next) {
  if (req.path === '/login' || req.path === '/login/') {
    return next();
  }
  authenticateToken(req, res, next);
}

module.exports = setupToken;