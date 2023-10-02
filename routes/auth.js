const express = require('express');
const passport = require('passport');
const models = require('../models');

const router = express.Router();

// API untuk login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }

      // Cari role dengan pengguna berdasarkan UserRoles
      const userRoles = await models.UserRoles.findAll({
        where: { UserId: user.id },
        include: [
          {
            model: models.Roles,
          },
        ],
      });

      // Ambil daftar role pengguna
      const roles = userRoles.map((userRole) => userRole.Role.name);

      // Cari menu dan permission berdasarkan RoleMenuPermissions
      const userPermissions = await models.RoleMenuPermissions.findAll({
        where: { RoleId: userRoles.map((userRole) => userRole.Role.id) },
        include: [
          {
            model: models.Menus,
          },
          {
            model: models.Permissions,
          },
        ],
      });

      // Ambil menu dan permission yang dimiliki pengguna
      const canAccess = userPermissions.map((permission) => `${permission.Menu.name}-${permission.Permission.name}`);

      // Simpan peran dan akses dalam respons
      const response = {
        message: 'Authentication successful',
        roles,
        canAccess,
      };

      // Simpan dalam sesi
      req.session.roles = roles;
      req.session.canAccess = canAccess;

      return res.json(response);
    });
  })(req, res, next);
});

// API untuk logout
router.get('/logout', async (req, res) => {
  if (req.session) {
    req.session.destroy();
  }

  res.json({ message: 'Logout berhasil' });
});

// API untuk memeriksa status login
router.get('/check-login', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
