const express = require('express');
const router = express.Router();
const models = require('../models');

// CREATE: Tambahkan menu baru
router.post('/menus', async (req, res) => {
   try {
      const { name } = req.body;
      const newMenu = await models.Menus.create({ name });
      res.status(201).json(newMenu);
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         res.status(400).json({ message: 'Nama menu sudah ada' });
      } else {
         console.error(error);
         res.status(500).json({ message: 'Gagal menambahkan menu' });
      }
   }
});

// READ: Dapatkan semua menu
router.get('/menus', async (req, res) => {
   try {
      const menus = await models.Menus.findAll();
      res.json(menus);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mendapatkan menu' });
   }
});

// UPDATE: Perbarui menu berdasarkan ID
router.put('/menus/:id', async (req, res) => {
   try {
      const menuId = req.params.id;
      const { name } = req.body;
      const updatedMenu = await models.Menus.update(
         { name },
         { where: { id: menuId } }
      );
      res.json(updatedMenu);
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         res.status(400).json({ message: 'Nama menu sudah ada' });
      } else {
         console.error(error);
         res.status(500).json({ message: 'Gagal memperbarui menu' });
      }
   }
});

// DELETE: Hapus menu berdasarkan ID
router.delete('/menus/:id', async (req, res) => {
   try {
      const menuId = req.params.id;
      await models.Menus.destroy({ where: { id: menuId } });
      res.json({ message: 'Menu berhasil dihapus' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus menu' });
   }
});

module.exports = router;
