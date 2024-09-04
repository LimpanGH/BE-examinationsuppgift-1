const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  findProductById,
  getProducts,
  updateProduct,
  getTotalStockValue,
  getStockValueByManufacturer,
  getManufacturers,
  getCriticalStock,
  getLowStock,
  getStockValuesForAllManufacturers,
} = require("../../serverRest/db/productService");

// Get /manufacturers
router.get("/manufacturers", async (req, res) => {
  try {
    const manufacturers = await getManufacturers();
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error("Error getting manufacturers", error);
    res.status(500).json({ error: "Failed to get manufacturers" });
  }
});

/* // GET /stock-value/:manufacturerId
router.get('/stock-value/:manufacturerId', async (req, res) => {
  console.log('GET /api/products/stock-value/:manufacturerId');
  try {
    const manufacturerId = req.params.manufacturerId;
    if (!manufacturerId) {
      res.status(400).send('ManufacturerId is required');
      return;
    }
    const stockValue = await getStockValueByManufacturerId(manufacturerId);
    res.status(200).json({ stockValue });
  } catch (error) {
    console.error('Error getting stock value by manufacturerId', error);
    res.status(500).json({ error: 'Failed to get stock value by manufacturerId' });
  }
}); */

// New route to get total stock value for each manufacturer
router.get("/total-stock-value-for-all-manufacturers", async (req, res) => {
  console.log("GET /api/products/total-stock-value-for-all-manufacturers");
  try {
    const stockValues = await getStockValuesForAllManufacturers();
    res.status(200).json(stockValues);
  } catch (error) {
    console.error("Error getting stock values for all manufacturers", error);
    res
      .status(500)
      .json({ error: "Failed to get stock values for all manufacturers" });
  }
});

// GET /api/products/total-stock-value-by-manufacturer
router.get("/total-stock-value-by-manufacturer", async (req, res) => {
  console.log("GET /api/products/total-stock-value-by-manufacturer");
  try {
    const manufacturer = req.query.manufacturer;
    if (!manufacturer) {
      res.status(400).send("Manufacturer is required");
      return;
    }

    const stockValue = await getStockValueByManufacturer(manufacturer);
    res.status(200).json({ stockValue });
  } catch (error) {
    console.error("Error getting stock value by manufacturer", error);
    res
      .status(500)
      .json({ error: "Failed to get stock value by manufacturer" });
  }
});

//GET  total stock value: //api/products/total-stock-value
router.get("/total-stock-value", async (req, res) => {
  console.log("GET /api/products/total-stock-value");
  try {
    const totalStockValue = await getTotalStockValue();
    res.status(200).json({ totalStockValue });
  } catch (error) {
    console.error("Error getting total stock value", error);
    res.status(500).json({ error: "Failed to get total stock value" });
  }
});

// GET /products/critical-stock
router.get("/critical-stock", async (req, res) => {
  try {
    const criticalStock = await getCriticalStock();
    res.status(200).json(criticalStock);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ error: "Failed to get product" });
  }
});

// GET /products/low-stock
router.get("/low-stock", async (req, res) => {
  try {
    const lowStock = await getLowStock();
    res.status(200).json(lowStock);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ error: "Failed to get product" });
  }
});

// GET products by ID
router.get("/:id", async (req, res) => {
  console.log("GET /api/products/:id");
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("ID is required");
    }

    const product = await findProductById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).send("An error occurred while retrieving the product");
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ error: "Failed to get product" });
  }
});

// POST
router.post("/", async (request, response) => {
  const product = request.body;
  const newProduct = await createProduct(product);
  response.status(201).json(newProduct);
});

//PUT - update product by ID
router.put("/:id", async (req, res) => {
  console.log("PUT /api/products/:id");
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("ID is required");
      return;
    }

    const updatedProduct = req.body;
    await updateProduct(id, updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//DELETE product by ID
router.delete("/:id", async (req, res) => {
  console.log("DELETE /api/products/:id");
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
    res.status(204).send(`Product deleted with id: ${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
