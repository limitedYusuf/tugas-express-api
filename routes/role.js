const express = require('express');
const router = express.Router();
const models = require('../models');
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');

// CREATE: Tambahkan role baru
router.post('/roles', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'write' };
   canAccess(req, res, next);
}, async (req, res) => {
   try {
      const { name } = req.body;
      const newRole = await models.Roles.create({ name });
      res.status(201).json(newRole);
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         res.status(400).json({ message: 'Nama role sudah ada' });
      } else {
         console.error(error);
         res.status(500).json({ message: 'Gagal menambahkan role' });
      }
   }
});

// READ: Dapatkan semua role
router.get('/roles', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'read' };
   canAccess(req, res, next);
}, async (req, res) => {
   try {
      const roles = await models.Roles.findAll();
      res.json(roles);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mendapatkan role' });
   }
});

// UPDATE: Perbarui role berdasarkan ID
router.put('/roles/:id', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'edit' };
   canAccess(req, res, next);
}, async (req, res) => {
   try {
      const roleId = req.params.id;
      const { name } = req.body;
      const updatedRole = await models.Roles.update(
         { name },
         { where: { id: roleId } }
      );
      res.json(updatedRole);
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         res.status(400).json({ message: 'Nama role sudah ada' });
      } else {
         console.error(error);
         res.status(500).json({ message: 'Gagal memperbarui role' });
      }
   }
});

// DELETE: Hapus role berdasarkan ID
router.delete('/roles/:id', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'rbac', permission: 'destroy' };
   canAccess(req, res, next);
}, async (req, res) => {
   try {
      const roleId = req.params.id;
      await models.Roles.destroy({ where: { id: roleId } });
      res.json({ message: 'Role berhasil dihapus' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus role' });
   }
});

module.exports = router;
