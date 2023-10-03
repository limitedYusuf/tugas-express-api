const express = require('express');
const router = express.Router();
const { createRole, getAllRoles, updateRole, deleteRole } = require('../handlers/roleHandler');
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');

// CREATE: Tambahkan role baru
router.post('/roles', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'write' };
   canAccess(req, res, next);
}, createRole);

// READ: Dapatkan semua role
router.get('/roles', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'read' };
   canAccess(req, res, next);
}, getAllRoles);

// UPDATE: Perbarui role berdasarkan ID
router.put('/roles/:id', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'edit' };
   canAccess(req, res, next);
}, updateRole);

// DELETE: Hapus role berdasarkan ID
router.delete('/roles/:id', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'destroy' };
   canAccess(req, res, next);
}, deleteRole);

module.exports = router;
