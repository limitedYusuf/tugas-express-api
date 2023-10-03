const models = require('../models');

async function createMenu(req, res) {
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
}

async function getAllMenus(req, res) {
  try {
    const menus = await models.Menus.findAll();
    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan menu' });
  }
}

async function updateMenu(req, res) {
  try {
    const menuId = req.params.id;
    const { name } = req.body;
    const updatedMenu = await models.Menus.update({ name }, { where: { id: menuId } });
    res.json(updatedMenu);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Nama menu sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui menu' });
    }
  }
}

async function deleteMenu(req, res) {
  try {
    const menuId = req.params.id;
    await models.Menus.destroy({ where: { id: menuId } });
    res.json({ message: 'Menu berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus menu' });
  }
}

module.exports = { createMenu, getAllMenus, updateMenu, deleteMenu };
