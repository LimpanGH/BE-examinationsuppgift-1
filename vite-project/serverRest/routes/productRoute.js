const express = require("express");
const router = express.Router();
const { createProduct, deleteProduct } = require("../db/productService");

// POST
router.post("/", async (request, response) => {
  const product = request.body;
  const newProduct = await createProduct(product);
  response.status(201).json(newProduct);
});

//DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("ID is required");
      return;
    }
    await deleteProduct(id);
    res.status(204).send("ID deleted");
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});

module.exports = router;
