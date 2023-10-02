// import package
const express = require('express');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import route
const authRoutes = require('./auth');
const roleRoutes = require('./role');
const menuRoutes = require('./menu');
const permissionRoutes = require('./permission');

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', roleRoutes);
router.use('/api', menuRoutes);
router.use('/api', permissionRoutes);

// dashboard
router.get('/api/dashboard', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'dashboard', permission: 'read' };
   canAccess(req, res, next);
 }, (req, res) => {
   res.json({ message: 'Dashboard menu' });
 });

module.exports = router;