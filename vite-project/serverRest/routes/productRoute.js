const express = require("express");
const router = express.Router();
const { createProduct } = require("../db/productCrud");

// POST /animals
router.post("/", async (request, response) => {
  const product = request.body;
  const newProduct = await createProduct(product);
  response.status(201).json(newProduct);
});

module.exports = router;
