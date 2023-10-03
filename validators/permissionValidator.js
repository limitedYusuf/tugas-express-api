const { body, param } = require('express-validator');

const validateCreatePermission = [
  body('name')
    .notEmpty().withMessage('Nama Permission harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Permission hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateUpdatePermission = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
  body('name')
    .notEmpty().withMessage('Nama Permission harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Permission hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateDestroyPermission = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreatePermission, validateUpdatePermission, validateDestroyPermission };
