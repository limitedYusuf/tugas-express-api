const express = require('express');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import other
const { createMenu, getAllMenus, updateMenu, deleteMenu } = require('../handlers/menuHandler');
const { validateCreateMenu, validateUpdateMenu, validateDestroyMenu } = require('../validators/menuValidator');

const router = express.Router();

// CREATE: Tambahkan menu baru
router.post('/menus', ensureAuthenticated, validateCreateMenu, (req, res, next) => {
   req.customData = { menu: 'rbac', menu: 'write' };
   canAccess(req, res, next);
}, createMenu);

// READ: Dapatkan semua menu
router.get('/menus', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', menu: 'read' };
   canAccess(req, res, next);
}, getAllMenus);

// UPDATE: Perbarui menu berdasarkan ID
router.put('/menus/:id', ensureAuthenticated, validateUpdateMenu, (req, res, next) => {
   req.customData = { menu: 'rbac', menu: 'edit' };
   canAccess(req, res, next);
}, updateMenu);

// DELETE: Hapus menu berdasarkan ID
router.delete('/menus/:id', ensureAuthenticated, validateDestroyMenu, (req, res, next) => {
   req.customData = { menu: 'rbac', menu: 'destroy' };
   canAccess(req, res, next);
}, deleteMenu);

module.exports = router;
