const express = require('express');
const router = express.Router();
const { createPermission, getAllPermissions, updatePermission, deletePermission } = require('../handlers/permissionHandler');
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');

// CREATE: Tambahkan permission baru
router.post('/permissions', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'write' };
   canAccess(req, res, next);
}, createPermission);

// READ: Dapatkan semua permission
router.get('/permissions', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'read' };
   canAccess(req, res, next);
}, getAllPermissions);

// UPDATE: Perbarui permission berdasarkan ID
router.put('/permissions/:id', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'edit' };
   canAccess(req, res, next);
}, updatePermission);

// DELETE: Hapus permission berdasarkan ID
router.delete('/permissions/:id', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'destroy' };
   canAccess(req, res, next);
}, deletePermission);

module.exports = router;
