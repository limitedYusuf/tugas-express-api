const express = require('express');
const router = express.Router();
const { createMenu, getAllMenus, updateMenu, deleteMenu } = require('../handlers/menuHandler');

// CREATE: Tambahkan menu baru
router.post('/menus', createMenu);

// READ: Dapatkan semua menu
router.get('/menus', getAllMenus);

// UPDATE: Perbarui menu berdasarkan ID
router.put('/menus/:id', updateMenu);

// DELETE: Hapus menu berdasarkan ID
router.delete('/menus/:id', deleteMenu);

module.exports = router;
