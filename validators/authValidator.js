const { body } = require('express-validator');

const validateAuth = [
  body('username')
    .notEmpty().withMessage('Username harus diisi')
    .trim()
    .not().contains(' ').withMessage('Username tidak boleh mengandung spasi'),
  body('password')
    .notEmpty().withMessage('Password harus diisi')
    .trim()
    .not().contains(' ').withMessage('Password tidak boleh mengandung spasi'),
];

module.exports = { validateAuth };
