const express = require('express');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import other
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('../handlers/categoryHandler');
const { validateCreateCategory, validateUpdateCategory, validateDestroyCategory } = require('../validators/categoryValidator');

const router = express.Router();

// CREATE: Tambahkan category baru
router.post('/category', ensureAuthenticated, validateCreateCategory, (req, res, next) => {
   req.customData = { menu: 'category', permission: 'write' };
   canAccess(req, res, next);
}, createCategory);

// READ: Dapatkan semua category
router.get('/category', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'category', permission: 'read' };
   canAccess(req, res, next);
}, getAllCategories);

// UPDATE: Perbarui category berdasarkan ID
router.put('/category/:id', ensureAuthenticated, validateUpdateCategory, (req, res, next) => {
   req.customData = { menu: 'category', permission: 'edit' };
   canAccess(req, res, next);
}, updateCategory);

// DELETE: Hapus category berdasarkan ID
router.delete('/category/:id', ensureAuthenticated, validateDestroyCategory, (req, res, next) => {
   req.customData = { menu: 'category', permission: 'destroy' };
   canAccess(req, res, next);
}, deleteCategory);

module.exports = router;
