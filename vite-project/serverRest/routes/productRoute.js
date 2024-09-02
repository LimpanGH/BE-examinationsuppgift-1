const express = require('express');
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  findProductById,
  getProducts,
  getCriticalStock,
  getLowStock,
} = require('../../serverRest/db/productService');

// GET /products/critical-stock
router.get('/critical-stock', async (req, res) => {
  try {
    const criticalStock = await getCriticalStock();
    res.status(200).json(criticalStock);
  } catch (error) {
    console.error('Error getting products', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// GET /products/low-stock
router.get('/low-stock', async (req, res) => {
  try {
    const lowStock = await getLowStock();
    res.status(200).json(lowStock);
  } catch (error) {
    console.error('Error getting products', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// GET products by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send('ID is required');
      return;
    }

    const product = await findProductById(id);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
router.post('/', async (request, response) => {
  const product = request.body;
  const newProduct = await createProduct(product);
  response.status(201).json(newProduct);
});

//DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send('ID is required');
      return;
    }

    const product = await findProductById(id);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    await deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
