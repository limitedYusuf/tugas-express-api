const { body, param } = require('express-validator');

const validateCreateMenu = [
  body('name')
    .notEmpty().withMessage('Nama Menu harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Menu hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateUpdateMenu = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
  body('name')
    .notEmpty().withMessage('Nama Menu harus diisi')
    .matches(/^[a-zA-Z0-9\s(),\/.]*$/).withMessage('Nama Menu hanya boleh huruf, angka, spasi, (, ), /, .')
    .trim(),
];

const validateDestroyMenu = [
  param('id')
    .notEmpty().withMessage('ID harus diisi')
    .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreateMenu, validateUpdateMenu, validateDestroyMenu };
