const express = require('express');
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
  findExistingProduct,
} = require('../../serverRest/db/productService');
const { body, validationResult } = require('express-validator');

const validateProduct = [
  // Validering av produkten
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('sku').isNumeric().withMessage('Sku must be a number'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isString().withMessage('Category must be a string'),
  body('amountInStock')
    .isNumeric()
    .withMessage('Amount in stock must be a number'),
  // Validering av 'manufacturer' objekt
  body('manufacturer.name')
    .isString()
    .withMessage('Manufacturer name must be a string'),
  body('manufacturer.country')
    .isString()
    .withMessage('Manufacturer country must be a string'),
  body('manufacturer.website')
    .isURL()
    .withMessage('Manufacturer website must be a valid URL'),
  body('manufacturer.address')
    .isString()
    .withMessage('Manufacturer address must be a string'),

  // Validering av 'contact' objekt inuti 'manufacturer'
  body('manufacturer.contact.email')
    .isEmail()
    .withMessage('Email must be a valid email'),
  body('manufacturer.contact.phone')
    .isString()
    .withMessage('Contact phone must be a string')
    .isLength({ min: 5 })
    .withMessage('Contact phone must be at least 5 characters long'),
];

// Get /manufacturers
router.get('/manufacturers', async (req, res) => {
  try {
    const manufacturers = await getManufacturers();
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error('Error getting manufacturers', error);
    res.status(500).json({ error: 'Failed to get manufacturers' });
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
router.get('/total-stock-value-for-all-manufacturers', async (req, res) => {
  console.log('GET /api/products/total-stock-value-for-all-manufacturers');
  try {
    const stockValues = await getStockValuesForAllManufacturers();
    res.status(200).json(stockValues);
  } catch (error) {
    console.error('Error getting stock values for all manufacturers', error);
    res
      .status(500)
      .json({ error: 'Failed to get stock values for all manufacturers' });
  }
});

// GET /api/products/total-stock-value-by-manufacturer
router.get('/total-stock-value-by-manufacturer', async (req, res) => {
  console.log('GET /api/products/total-stock-value-by-manufacturer');
  try {
    const manufacturer = req.query.manufacturer;
    if (!manufacturer) {
      res.status(400).send('Manufacturer is required');
      return;
    }

    const stockValue = await getStockValueByManufacturer(manufacturer);
    res.status(200).json({ stockValue });
  } catch (error) {
    console.error('Error getting stock value by manufacturer', error);
    res
      .status(500)
      .json({ error: 'Failed to get stock value by manufacturer' });
  }
});

//GET  total stock value: //api/products/total-stock-value
router.get('/total-stock-value', async (req, res) => {
  console.log('GET /api/products/total-stock-value');
  try {
    const totalStockValue = await getTotalStockValue();
    res.status(200).json({ totalStockValue });
  } catch (error) {
    console.error('Error getting total stock value', error);
    res.status(500).json({ error: 'Failed to get total stock value' });
  }
});

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

// GET products by ID
router.get('/:id', async (req, res) => {
  console.log('GET /api/products/:id');
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send('ID is required');
    }

    const product = await findProductById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    res.status(500).send('An error occurred while retrieving the product');
  }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const products = await getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// POST
router.post('/', validateProduct, async (request, response) => {
  const { sku } = request.body;

  try {
    const existingProduct = await findExistingProduct(sku);
    if (existingProduct) {
      return response.status(400).json({ errors: 'Sku number already exists' });
    }
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors });
    }
    const product = request.body;
    const newProduct = await createProduct(product);
    response.status(201).json(newProduct);
  } catch (error) {
    response.status(500).send('Server error');
  }
});

//PUT - update product by ID
router.put('/:id', validateProduct, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  console.log('PUT /api/products/:id');

  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send('ID is required');
    }
    const updatedProduct = req.body;

    const product = await updateProduct(id, updatedProduct);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//DELETE product by ID
router.delete('/:id', async (req, res) => {
  console.log('DELETE /api/products/:id');
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
    res.status(204).send(`Product deleted with id: ${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
