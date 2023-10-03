const { body, param } = require('express-validator');

const validateCreateUserRole = [
  body('UserId')
    .notEmpty().withMessage('UserId harus diisi')
    .isNumeric().withMessage('UserId hanya boleh berisi angka'),
  body('RoleId')
    .notEmpty().withMessage('RoleId harus diisi')
    .isNumeric().withMessage('RoleId hanya boleh berisi angka'),
];

const validateUpdateUserRole = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
  body('UserId')
    .notEmpty().withMessage('UserId harus diisi')
    .isNumeric().withMessage('UserId hanya boleh berisi angka'),
  body('RoleId')
    .notEmpty().withMessage('RoleId harus diisi')
    .isNumeric().withMessage('RoleId hanya boleh berisi angka'),
];

const validateDestroyUserRole = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreateUserRole, validateUpdateUserRole, validateDestroyUserRole };
