const { body, param } = require('express-validator');

const validateCreateRoleMenuPermission = [
  body('MenuId')
    .notEmpty().withMessage('MenuId harus diisi')
    .isNumeric().withMessage('MenuId hanya boleh berisi angka'),
  body('RoleId')
    .notEmpty().withMessage('RoleId harus diisi')
    .isNumeric().withMessage('RoleId hanya boleh berisi angka'),
    body('PermissionId')
    .notEmpty().withMessage('PermissionId harus diisi')
    .isNumeric().withMessage('PermissionId hanya boleh berisi angka'),
];

const validateUpdateRoleMenuPermission = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
  body('MenuId')
    .notEmpty().withMessage('MenuId harus diisi')
    .isNumeric().withMessage('MenuId hanya boleh berisi angka')
    .custom(value => {
      if (!/^[0-9]+$/.test(value)) {
        throw new Error('MenuId hanya boleh berisi angka');
      }
      return true;
    })
    .custom(value => {
      if (value.includes('e')) {
        throw new Error('MenuId tidak boleh mengandung huruf "e"');
      }
      return true;
    }),
  body('RoleId')
    .notEmpty().withMessage('RoleId harus diisi')
    .isNumeric().withMessage('RoleId hanya boleh berisi angka'),
    body('PermissionId')
    .notEmpty().withMessage('PermissionId harus diisi')
    .isNumeric().withMessage('PermissionId hanya boleh berisi angka'),
];

const validateDestroyRoleMenuPermission = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreateRoleMenuPermission, validateUpdateRoleMenuPermission, validateDestroyRoleMenuPermission };
