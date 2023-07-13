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
    }

    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json({ message: 'not found!'});
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
