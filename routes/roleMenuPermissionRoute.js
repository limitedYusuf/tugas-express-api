const express = require('express');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import other
const { createRoleMenuPermission, getAllRoleMenuPermissions, updateRoleMenuPermission, deleteRoleMenuPermission } = require('../handlers/roleMenuPermissionHandler');
const { validateCreateRoleMenuPermission, validateUpdateRoleMenuPermission, validateDestroyRoleMenuPermission } = require('../validators/roleMenuPermissionValidator');

const router = express.Router();

// CREATE: Tambahkan RoleMenuPermission baru
router.post('/role-menu-permissions', ensureAuthenticated, validateCreateRoleMenuPermission, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'write' };
  canAccess(req, res, next);
}, createRoleMenuPermission);

// READ: Dapatkan semua RoleMenuPermissions
router.get('/role-menu-permissions', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'read' };
  canAccess(req, res, next);
}, getAllRoleMenuPermissions);

// UPDATE: Perbarui RoleMenuPermission berdasarkan ID
router.put('/role-menu-permissions/:id', ensureAuthenticated, validateUpdateRoleMenuPermission, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'edit' };
  canAccess(req, res, next);
}, updateRoleMenuPermission);

// DELETE: Hapus RoleMenuPermission berdasarkan ID
router.delete('/role-menu-permissions/:id', ensureAuthenticated, validateDestroyRoleMenuPermission, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'destroy' };
  canAccess(req, res, next);
}, deleteRoleMenuPermission);

module.exports = router;
