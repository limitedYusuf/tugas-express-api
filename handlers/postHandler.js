const models = require('../models');

// CREATE: Tambahkan posting baru
async function createPost(req, res) {
   try {
      const { name, caption, CategoryId, UserId } = req.body;
      const thumbnail = req.file ? req.file.filename : null;
      const slug = slugify(name, { lower: true }); // Membuat slug dari "name"

      const post = await models.Post.create({
         slug,
         name,
         caption,
         CategoryId,
         UserId,
         thumbnail,
         content: req.body.content,
      });

      res.json(post);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menambahkan posting' });
   }
}

// READ: Dapatkan semua posting
async function getAllPosts(req, res) {
   try {
      const posts = await models.Post.findAll({
         include: [
            {
               model: models.Category,
               as: 'category',
            },
            {
               model: models.User,
               as: 'user',
            },
         ],
      });

      res.json(posts);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mendapatkan posting' });
   }
}

// UPDATE: Perbarui posting berdasarkan ID
async function updatePost(req, res) {
   try {
      const { id } = req.params;
      const { name, caption, CategoryId, UserId } = req.body;
      const thumbnail = req.file ? req.file.filename : null;
      const slug = slugify(name, { lower: true }); // Membuat slug dari "name"

      const post = await models.Post.findByPk(id);

      if (!post) {
         return res.status(404).json({ message: 'Posting tidak ditemukan' });
      }

      post.slug = slug;
      post.name = name;
      post.caption = caption;
      post.CategoryId = CategoryId;
      post.UserId = UserId;
      post.thumbnail = thumbnail;
      post.content = req.body.content;

      await post.save();

      res.json(post);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui posting' });
   }
}

// DELETE: Hapus posting berdasarkan ID
async function deletePost(req, res) {
   try {
      const { id } = req.params;
      const post = await models.Post.findByPk(id);

      if (!post) {
         return res.status(404).json({ message: 'Posting tidak ditemukan' });
      }

      await post.destroy();

      res.json({ message: 'Posting berhasil dihapus' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus posting' });
   }
}

module.exports = { createPost, getAllPosts, updatePost, deletePost };
