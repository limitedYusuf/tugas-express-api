// import package
const express = require('express');
// import config
const canAccess = require('../middleware/rbacMiddleware');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const setupToken = require('../middleware/tokenMiddleware');
// import route
const authRoute = require('./authRoute');
const roleRoute = require('./roleRoute');
const menuRoute = require('./menuRoute');
const permissionRoute = require('./permissionRoute');
const userRolesRoute = require('./userRolesRoute');
const roleMenuPermissionRoute = require('./roleMenuPermissionRoute');
const categoryRoute = require('./categoryRoute');
const postRoute = require('./postRoute');

const router = express.Router();

// set jwt
router.use('/api', setupToken);

router.use('/api', authRoute);
router.use('/api', roleRoute);
router.use('/api', menuRoute);
router.use('/api', permissionRoute);
router.use('/api', userRolesRoute);
router.use('/api', roleMenuPermissionRoute);
router.use('/api', categoryRoute);
router.use('/api', postRoute);

// dashboard
router.get('/api/dashboard', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'dashboard', permission: 'read' };
  canAccess(req, res, next);
}, (req, res) => {
  res.json({ message: 'Dashboard menu' });
});

module.exports = router;