const models = require('../models');

async function createRole(req, res) {
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
}

async function getAllRoles(req, res) {
  try {
    const roles = await models.Roles.findAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan role' });
  }
}

async function updateRole(req, res) {
  try {
    const roleId = req.params.id;
    const { name } = req.body;
    const updatedRole = await models.Roles.update({ name }, { where: { id: roleId } });
    res.json(updatedRole);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Nama role sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui role' });
    }
  }
}

async function deleteRole(req, res) {
  try {
    const roleId = req.params.id;
    await models.Roles.destroy({ where: { id: roleId } });
    res.json({ message: 'Role berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus role' });
  }
}

module.exports = { createRole, getAllRoles, updateRole, deleteRole };
