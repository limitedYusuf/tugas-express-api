const express = require('express');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import other
const { createUserRoles, getAllUserRoles, updateUserRoles, deleteUserRoles } = require('../handlers/userRolesHandler');
const { validateCreateUserRole, validateUpdateUserRole, validateDestroyUserRole } = require('../validators/userRolesValidator');

const router = express.Router();

// CREATE: Tambahkan UserRoles baru
router.post('/user-roles', ensureAuthenticated, validateCreateUserRole, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'write' };
  canAccess(req, res, next);
}, createUserRoles);

// READ: Dapatkan semua UserRoles
router.get('/user-roles', ensureAuthenticated, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'read' };
  canAccess(req, res, next);
}, getAllUserRoles);

// UPDATE: Perbarui UserRoles berdasarkan ID
router.put('/user-roles/:id', ensureAuthenticated, validateUpdateUserRole, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'edit' };
  canAccess(req, res, next);
}, updateUserRoles);

// DELETE: Hapus UserRoles berdasarkan ID
router.delete('/user-roles/:id', ensureAuthenticated, validateDestroyUserRole, (req, res, next) => {
  req.customData = { menu: 'rbac', permission: 'destroy' };
  canAccess(req, res, next);
}, deleteUserRoles);

module.exports = router;
