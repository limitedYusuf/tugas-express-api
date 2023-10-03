const express = require('express');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import other
const { createRole, getAllRoles, updateRole, deleteRole } = require('../handlers/roleHandler');
const { validateCreateRole, validateUpdateRole, validateDestroyRole } = require('../validators/roleValidator');

const router = express.Router();

// CREATE: Tambahkan role baru
router.post('/roles', ensureAuthenticated, validateCreateRole, (req, res, next) => {
   req.customData = { menu: 'rbac', role: 'write' };
   canAccess(req, res, next);
}, createRole);

// READ: Dapatkan semua role
router.get('/roles', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', role: 'read' };
   canAccess(req, res, next);
}, getAllRoles);

// UPDATE: Perbarui role berdasarkan ID
router.put('/roles/:id', ensureAuthenticated, validateUpdateRole, (req, res, next) => {
   req.customData = { menu: 'rbac', role: 'edit' };
   canAccess(req, res, next);
}, updateRole);

// DELETE: Hapus role berdasarkan ID
router.delete('/roles/:id', ensureAuthenticated, validateDestroyRole, (req, res, next) => {
   req.customData = { menu: 'rbac', role: 'destroy' };
   canAccess(req, res, next);
}, deleteRole);

module.exports = router;
