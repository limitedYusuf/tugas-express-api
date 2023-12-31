const { validationResult } = require('express-validator');
const models = require('../models');

async function createRoleMenuPermission(req, res) {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const { RoleId, MenuId, PermissionId } = req.body;

      const existingRoleMenuPermission = await models.RoleMenuPermissions.findOne({
         where: { RoleId, MenuId, PermissionId },
      });

      if (existingRoleMenuPermission) {
         return res.status(400).json({ message: 'Pasangan RoleId, MenuId, dan PermissionId sudah ada' });
      }

      const newRoleMenuPermission = await models.RoleMenuPermissions.create({ RoleId, MenuId, PermissionId });
      res.status(201).json(newRoleMenuPermission);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menambahkan RoleMenuPermission' });
   }
}

async function getAllRoleMenuPermissions(req, res) {
   try {
      const roleMenuPermissions = await models.RoleMenuPermissions.findAll({
         include: [
            {
               model: models.Roles,
               attributes: ['name'],
               as: 'Role',
            },
            {
               model: models.Menus,
               attributes: ['name'],
               as: 'Menu',
            },
            {
               model: models.Permissions,
               attributes: ['name'],
               as: 'Permission',
            },
         ],
      });

      const formattedRoleMenuPermissions = roleMenuPermissions.map((roleMenuPermission) => {
         return {
            RoleId: roleMenuPermission.RoleId,
            MenuId: roleMenuPermission.MenuId,
            PermissionId: roleMenuPermission.PermissionId,
            RoleName: roleMenuPermission.Role.name,
            MenuName: roleMenuPermission.Menu.name,
            PermissionName: roleMenuPermission.Permission.name,
            createdAt: roleMenuPermission.createdAt,
            updatedAt: roleMenuPermission.updatedAt,
         };
      });

      res.json(formattedRoleMenuPermissions);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mendapatkan RoleMenuPermissions' });
   }
}

async function updateRoleMenuPermission(req, res) {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const roleMenuPermissionId = req.params.id;
      const { RoleId, MenuId, PermissionId } = req.body;

      const existingRoleMenuPermission = await models.RoleMenuPermissions.findOne({
         where: { RoleId, MenuId, PermissionId },
      });

      if (existingRoleMenuPermission) {
         return res.status(400).json({ message: 'Pasangan RoleId, MenuId, dan PermissionId sudah ada' });
      }

      await models.RoleMenuPermissions.update({ RoleId, MenuId, PermissionId }, { where: { id: roleMenuPermissionId } });

      res.json({ message: 'RoleMenuPermission berhasil diperbarui' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui RoleMenuPermission' });
   }
}

async function deleteRoleMenuPermission(req, res) {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const roleMenuPermissionId = req.params.id;

      await models.RoleMenuPermissions.destroy({ where: { id: roleMenuPermissionId } });

      res.json({ message: 'RoleMenuPermission berhasil dihapus' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus RoleMenuPermission' });
   }
}

module.exports = { createRoleMenuPermission, getAllRoleMenuPermissions, updateRoleMenuPermission, deleteRoleMenuPermission };
