const { validationResult } = require('express-validator');
const models = require('../models');

async function createUserRoles(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { UserId, RoleId } = req.body;

    const existingUserRoles = await models.UserRoles.findOne({
      where: { UserId, RoleId },
    });

    if (existingUserRoles) {
      return res.status(400).json({ message: 'Pasangan UserId dan RoleId sudah ada' });
    }

    const newUserRoles = await models.UserRoles.create({ UserId, RoleId });
    res.status(201).json(newUserRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambahkan UserRoles' });
  }
}

async function getAllUserRoles(req, res) {
  try {
    const userRoles = await models.UserRoles.findAll({
      include: [
        {
          model: models.Users,
          attributes: ['username'],
          as: 'User',
        },
        {
          model: models.Roles,
          attributes: ['name'],
          as: 'Role',
        },
      ],
    });

    const formattedUserRoles = userRoles.map((userRole) => {
      return {
        id: userRole.id,
        UserId: userRole.UserId,
        RoleId: userRole.RoleId,
        UserName: userRole.User.username,
        RoleName: userRole.Role.name,
        createdAt: userRole.createdAt,
        updatedAt: userRole.updatedAt,
      };
    });

    res.json(formattedUserRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan UserRoles' });
  }
}

async function updateUserRoles(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userRoleId = req.params.id;
    const { UserId, RoleId } = req.body;

    const existingUserRoles = await models.UserRoles.findOne({
      where: { UserId, RoleId, id: { [models.Sequelize.Op.ne]: userRoleId } },
    });

    if (existingUserRoles) {
      return res.status(400).json({ message: 'Pasangan UserId dan RoleId sudah ada di data lain' });
    }

    await models.UserRoles.update({ UserId, RoleId }, { where: { id: userRoleId } });

    res.json({ message: 'UserRoles berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui UserRoles' });
  }
}

async function deleteUserRoles(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userRoleId = req.params.id;

    await models.UserRoles.destroy({ where: { id: userRoleId } });

    res.json({ message: 'UserRoles berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus UserRoles' });
  }
}

module.exports = { createUserRoles, getAllUserRoles, updateUserRoles, deleteUserRoles };
