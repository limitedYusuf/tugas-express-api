const express = require('express');
const multer = require('multer');
// import config
const canAccess = require('../middleware/rbac');
const { ensureAuthenticated } = require('../middleware/auth');
// import other
const { createPost, getAllPosts, updatePost, deletePost } = require('../handlers/postHandler');
const { validateCreatePost, validateUpdatePost, validateDestroyPost } = require('../validators/postValidator');

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/post/');
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
   },
});

const upload = multer({ storage });

// CREATE: Tambahkan posting baru
router.post('/posts', ensureAuthenticated, validateCreatePost, (req, res, next) => {
   req.customData = { menu: 'post', permission: 'write' };
   canAccess(req, res, next);
}, upload.single('thumbnail'), createPost);

// READ: Dapatkan semua posting
router.get('/posts', ensureAuthenticated, (req, res, next) => {
   req.customData = { menu: 'post', permission: 'read' };
   canAccess(req, res, next);
}, getAllPosts);

// UPDATE: Perbarui posting berdasarkan ID
router.put('/posts/:id', ensureAuthenticated, validateUpdatePost, (req, res, next) => {
   req.customData = { menu: 'post', permission: 'edit' };
   canAccess(req, res, next);
}, upload.single('thumbnail'), updatePost);

// DELETE: Hapus posting berdasarkan ID
router.delete('/posts/:id', ensureAuthenticated, validateDestroyPost, (req, res, next) => {
   req.customData = { menu: 'post', permission: 'destroy' };
   canAccess(req, res, next);
}, deletePost);

module.exports = router;
