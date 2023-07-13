const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, 
          through: {
            model: ProductTag,
            attributes: ['id', 'product_id', 'tag_id'],
          },
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Tags not found!' });
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { 
          model: Product, 
          through: {
            model: ProductTag,
            attributes: ['id', 'product_id', 'tag_id'],
          },
        },
      ],
    });
    if (!tagData) { 
      res.status(404).json({ message: 'No tag found with this id'});
      return;
    } 
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: 'Tag creation failed'});
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const uptdateTag = await Tag.update(req.body, {
      where: { id: req.params.id},
  // update a tag's name by its `id` value
});

if (!tagData[0]) {
  res.status(400).json({ message: "No tag found with this id!"});
  return;
}
res.status(200).json(tagData)
} catch (err) {
  res.status(500).json(err);
}
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
