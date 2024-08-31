const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../../serverRest/db/productService');

// POST /
router.post('/', async (request, response) => {
  const product = request.body;
  const newProduct = await createProduct(product);
  response.status(201).json(newProduct);
});

// GET

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

module.exports = router;
