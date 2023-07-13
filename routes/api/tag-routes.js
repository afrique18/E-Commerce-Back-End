const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, 
        {
          model: Tag,
          through: {
            attributes: ['id', 'product_id', 'tag_id'],
          },
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json({ message: 'Tags not found!' });
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, 
        {
          model: Tag,
          through: {
            model: ProductTag,
            attributes: ['id', 'product_id', 'tag_id'],
          },
        },
      ],
    });
    if (!productData) { 
      res.status(400).json({ message: 'No tag found with this id'});
      return;
    } 
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
