const express = require('express');
const router = express.Router();
const { createRoleMenuPermission, getAllRoleMenuPermissions, updateRoleMenuPermission, deleteRoleMenuPermission } = require('../handlers/roleMenuPermissionHandler');
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');

// CREATE: Tambahkan RoleMenuPermission baru
router.post('/role-menu-permissions', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'write' };
  canAccess(req, res, next);
}, createRoleMenuPermission);

// READ: Dapatkan semua RoleMenuPermissions
router.get('/role-menu-permissions', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'read' };
  canAccess(req, res, next);
}, getAllRoleMenuPermissions);

// UPDATE: Perbarui RoleMenuPermission berdasarkan ID
router.put('/role-menu-permissions/:id', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'edit' };
  canAccess(req, res, next);
}, updateRoleMenuPermission);

// DELETE: Hapus RoleMenuPermission berdasarkan ID
router.delete('/role-menu-permissions/:id', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'destroy' };
  canAccess(req, res, next);
}, deleteRoleMenuPermission);

module.exports = router;
