'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tambahkan data ke dalam tabel Role
    await queryInterface.bulkInsert('Roles', [
      { name: 'admin' },
      { name: 'editor' },
      { name: 'viewer' },
    ]);

    // Tambahkan data ke dalam tabel User
    const saltRounds = 10;
    const adminPasswordHash = await bcrypt.hash('admin-password', saltRounds);
    const editorPasswordHash = await bcrypt.hash('editor-password', saltRounds);
    const viewerPasswordHash = await bcrypt.hash('viewer-password', saltRounds);

    await queryInterface.bulkInsert('Users', [
      { username: 'admin', password: adminPasswordHash },
      { username: 'editor', password: editorPasswordHash },
      { username: 'viewer', password: viewerPasswordHash },
    ]);

    // Buat role dengan pengguna
    await queryInterface.bulkInsert('UserRoles', [
      { UserId: 1, RoleId: 1 }, // User 1 memiliki role admin
      { UserId: 1, RoleId: 2 }, // User 1 memiliki role editor
      { UserId: 2, RoleId: 2 }, // User 2 memiliki role editor
      { UserId: 3, RoleId: 3 }, // User 3 memiliki role viewer
    ]);

    // Tambahkan data ke dalam tabel Menu
    await queryInterface.bulkInsert('Menus', [
      { name: 'dashboard' },
      { name: 'rbac' },
      { name: 'kelas' },
      { name: 'siswa' },
    ]);

    // Tambahkan data ke dalam tabel Permission
    await queryInterface.bulkInsert('Permissions', [
      { name: 'read' },
      { name: 'write' },
      { name: 'edit' },
      { name: 'destroy' },
    ]);

    // Tambahkan data ke dalam tabel RoleMenuPermission
    await queryInterface.bulkInsert('RoleMenuPermissions', [
      { RoleId: 1, MenuId: 1, PermissionId: 1 }, // Admin memiliki izin untuk membaca dashboard
      { RoleId: 1, MenuId: 2, PermissionId: 1 }, // Admin memiliki izin untuk membaca RBAC
      { RoleId: 1, MenuId: 2, PermissionId: 2 }, // Admin memiliki izin untuk menulis RBAC
      { RoleId: 1, MenuId: 2, PermissionId: 3 }, // Admin memiliki izin untuk mengedit RBAC
      { RoleId: 1, MenuId: 2, PermissionId: 4 }, // Admin memiliki izin untuk menghapus RBAC
      { RoleId: 2, MenuId: 3, PermissionId: 1 }, // Editor memiliki izin untuk membaca kelas
      { RoleId: 2, MenuId: 3, PermissionId: 2 }, // Editor memiliki izin untuk menulis kelas
      { RoleId: 2, MenuId: 3, PermissionId: 3 }, // Editor memiliki izin untuk mengedit kelas
      { RoleId: 2, MenuId: 3, PermissionId: 4 }, // Editor memiliki izin untuk menghapus kelas
      { RoleId: 2, MenuId: 4, PermissionId: 1 }, // Editor memiliki izin untuk membaca siswa
      { RoleId: 2, MenuId: 4, PermissionId: 2 }, // Editor memiliki izin untuk menulis siswa
      { RoleId: 2, MenuId: 4, PermissionId: 3 }, // Editor memiliki izin untuk mengedit siswa
      { RoleId: 2, MenuId: 4, PermissionId: 4 }, // Editor memiliki izin untuk menghapus siswa
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Menus', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('RoleMenuPermissions', null, {});
    await queryInterface.bulkDelete('UserRoles', null, {});
  },
};
