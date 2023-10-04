const { body, param } = require('express-validator');

const validateCreatePost = [
   body('nama')
      .notEmpty().withMessage('Nama harus diisi'),

   body('caption')
      .notEmpty().withMessage('Caption harus diisi'),

   body('CategoryId')
      .notEmpty().withMessage('CategoryId harus diisi')
      .isNumeric().withMessage('CategoryId hanya boleh berisi angka')
      .not().matches(/\s/).withMessage('CategoryId tidak boleh mengandung spasi'),

   body('UserId')
      .notEmpty().withMessage('UserId harus diisi')
      .isNumeric().withMessage('UserId hanya boleh berisi angka')
      .not().matches(/\s/).withMessage('UserId tidak boleh mengandung spasi'),

   body('content')
      .notEmpty().withMessage('Content harus diisi'),

   body('thumbnail')
      .custom((value, { req }) => {
         if (!req.file) {
            throw new Error('Thumbnail harus diisi');
         }

         const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
         const fileExtension = req.file.originalname.split('.').pop();

         if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
            throw new Error('Thumbnail harus memiliki ekstensi jpg, jpeg, png, atau webp');
         }

         return true;
      }),
];

const validateUpdatePost = [
   param('id')
      .notEmpty().withMessage('ID harus diisi')
      .isNumeric().withMessage('ID hanya boleh berisi angka'),

   body('nama')
      .notEmpty().withMessage('Nama harus diisi'),

   body('caption')
      .notEmpty().withMessage('Caption harus diisi'),

   body('CategoryId')
      .notEmpty().withMessage('CategoryId harus diisi')
      .isNumeric().withMessage('CategoryId hanya boleh berisi angka')
      .not().matches(/\s/).withMessage('CategoryId tidak boleh mengandung spasi'),

   body('UserId')
      .notEmpty().withMessage('UserId harus diisi')
      .isNumeric().withMessage('UserId hanya boleh berisi angka')
      .not().matches(/\s/).withMessage('UserId tidak boleh mengandung spasi'),

   body('content')
      .notEmpty().withMessage('Content harus diisi'),

   body('thumbnail')
      .custom((value, { req }) => {
         if (!req.file) {
            return true;
         }

         const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
         const fileExtension = req.file.originalname.split('.').pop();

         if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
            throw new Error('Thumbnail harus memiliki ekstensi jpg, jpeg, png, atau webp');
         }

         return true;
      }),
];

const validateDestroyPost = [
   param('id')
      .notEmpty().withMessage('ID harus diisi')
      .isNumeric().withMessage('ID hanya boleh berisi angka'),
];

module.exports = { validateCreatePost, validateUpdatePost, validateDestroyPost };
