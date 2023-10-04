const { body, param } = require('express-validator');

const validateCreateCategory = [
  body('name')
    .notEmpty().withMessage('Nama Category harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Category hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateUpdateCategory = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
  body('name')
    .notEmpty().withMessage('Nama Category harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Category hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateDestroyCategory = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreateCategory, validateUpdateCategory, validateDestroyCategory };
