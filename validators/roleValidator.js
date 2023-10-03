const { body, param } = require('express-validator');

const validateCreateRole = [
  body('name')
    .notEmpty().withMessage('Nama Role harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Role hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateUpdateRole = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
  body('name')
    .notEmpty().withMessage('Nama Role harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Role hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateDestroyRole = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreateRole, validateUpdateRole, validateDestroyRole };
