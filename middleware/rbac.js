const models = require('../models');

async function canAccess(req, res, next) {
  const { menu, permission } = req.customData;
  const user = req.user;

  try {
    // Dapatkan semua role pengguna dari database
    const userRoles = await models.UserRoles.findAll({ where: { UserId: user.id } });

    // Jika pengguna tidak memiliki peran, kirim respon error
    if (!userRoles || userRoles.length === 0) {
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses menu ini.' });
    }

    const menuData = await models.Menus.findOne({ where: { name: menu } });
    const permissionData = await models.Permissions.findOne({ where: { name: permission } });

    // variabel untuk menentukan apakah pengguna memiliki akses
    let hasAccess = false;

    for (const userRole of userRoles) {
      // apakah pengguna memiliki peran yang diperlukan untuk mengakses menu ini?
      const roleMenuPermission = await models.RoleMenuPermissions.findOne({
        where: {
          roleId: userRole.RoleId,
          menuId: menuData.id,
          permissionId: permissionData.id,
        },
      });

      if (roleMenuPermission) {
        // kalau sudah ketemu, set hasAccess ke true dan stop loop
        hasAccess = true;
        break;
      }
    }

    if (hasAccess) {
      next();
    } else {
      // Jika pengguna tidak memiliki akses, kirim respon error
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengakses menu ini.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat memeriksa izin.' });
  }
}

module.exports = canAccess;
