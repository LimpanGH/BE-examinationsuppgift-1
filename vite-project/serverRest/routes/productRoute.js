const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct,
  findProductById,getProducts } = require('../../serverRest/db/productService');

// GET all products

// GET products by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("ID is required");
      return;
    }

    const product = await findProductById(id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
router.post("/", async (request, response) => {
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

//DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("ID is required");
      return;
    }

    const product = await findProductById(id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    await deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("ID is required");
      return;
    }

    const product = await findProductById(id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    await deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
