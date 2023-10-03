const models = require('../models');

async function createPermission(req, res) {
  try {
    const { name } = req.body;
    const newPermission = await models.Permissions.create({ name });
    res.status(201).json(newPermission);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Nama permission sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Gagal menambahkan permission' });
    }
  }
}

async function getAllPermissions(req, res) {
  try {
    const permissions = await models.Permissions.findAll();
    res.json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan permission' });
  }
}

async function updatePermission(req, res) {
  try {
    const permissionId = req.params.id;
    const { name } = req.body;
    const updatedPermission = await models.Permissions.update({ name }, { where: { id: permissionId } });
    res.json(updatedPermission);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Nama permission sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui permission' });
    }
  }
}

async function deletePermission(req, res) {
  try {
    const permissionId = req.params.id;
    await models.Permissions.destroy({ where: { id: permissionId } });
    res.json({ message: 'Permission berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus permission' });
  }
}

module.exports = { createPermission, getAllPermissions, updatePermission, deletePermission };
