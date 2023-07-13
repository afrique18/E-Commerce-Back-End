const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
const categoryData = await Category.findAll({
  include: [{model: Product}]
});
res.status(200).json(categoryData)
  } catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: product}],
    });

    if (!categoryData) {
      res.status(404).json({message: 'id not found'});
      return;
    }

    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json({ message: 'not found!'});
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Creation failed' });
  }

  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id,
      },
    });

    if (!updateCategory[0]) {
      res.status(404).json({ message: "creation failed"});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({'creation failed!'});
      return;
    }
    return res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(500).json(err);
  }

  // delete a category by its `id` value
});

module.exports = router;
