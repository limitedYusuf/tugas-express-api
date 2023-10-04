const { validationResult } = require('express-validator');
const models = require('../models');

async function createCategory(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const newCategory = await models.Categories.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Nama category sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Gagal menambahkan category' });
    }
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await models.Categories.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan category' });
  }
}

async function updateCategory(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const updatedCategory = await models.Categories.update({ name }, { where: { id: categoryId } });
    res.json(updatedCategory);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Nama category sudah ada' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Gagal memperbarui category' });
    }
  }
}

async function deleteCategory(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categoryId = req.params.id;
    await models.Categories.destroy({ where: { id: categoryId } });
    res.json({ message: 'Category berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus category' });
  }
}

module.exports = { createCategory, getAllCategories, updateCategory, deleteCategory };
