const ProductModel = require("./models/productModel");

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

const getProducts = async (limit) => {
  return ProductModel.find().limit(limit);
};

const getLowStock = async () => {
  const products = await ProductModel.find({ amountInStock: { $lt: 30 } });
  console.log("Low stock products:", products);
  return products;
};

const getCriticalStock = async () => {
  const products = await ProductModel.find({ amountInStock: { $lt: 3 } });
  console.log("Critical stock products:", products);
  return products;
};

const deleteProduct = async (id) => {
  return ProductModel.findByIdAndDelete(id);
};

const findProductById = async (id) => {
  return ProductModel.findById(id);
};

const updateProduct = async (id, product) => {
  /* const updatedProduct = await ProductModel(findProductById(id)) */
  return ProductModel.findByIdAndUpdate(id, product, { new: true });
};

/* const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
}; */

const getTotalStockValue = async () => {
  const products = await getProducts();
  const totalStockValue = products.reduce(
    (total, product) => total + product.price * product.amountInStock,
    0
  );
  return totalStockValue;
};

/* const getStockValueByManufacturerId = async (manufacturerId) => {
  const products = await getProducts();
  const stockValue = products
    .filter((product) => product.manufacturer._id.toString() === manufacturerId)
    .reduce(
      (total, product) => total + product.price * product.amountInStock,
      0
    );
  return stockValue;
}; */

const getStockValueByManufacturer = async (manufacturer) => {
  const products = await ProductModel.find({
    manufacturer: { $regex: manufacturer, $options: 'i' }, // Case-insensitive partial match
  });
  const stockValue = products.reduce(
    (total, product) => total + product.price * product.amountInStock,
    0
  );
  return stockValue;
};

const getManufacturers = async () => {
  const manufacturers = await ProductModel.find(
    { manufacturer: { $exists: true } },
    { "manufacturer.name": true, _id: false }
  );
  const uniqueManufacturers = [
    ...new Set(manufacturers.map((product) => product.manufacturer.name)),
  ];
  return uniqueManufacturers;
};

const getStockValuesForAllManufacturers = async () => {
  const stockValues = await ProductModel.aggregate([
    {
      $group: {
        _id: "$manufacturer.name",
        totalStockValue: {
          $sum: { $multiply: ["$price", "$amountInStock"] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        manufacturerName: "$_id",
        totalStockValue: 1,
      },
    },
  ]);

  return stockValues.map(({ manufacturerName, totalStockValue }) => ({
    manufacturerName,
    totalStockValue,
  }));
};

const findExistingProduct = async (sku) => {
  return await ProductModel.findOne({ sku });
};

module.exports = {
  createProduct,
  getProducts,
  getCriticalStock,
  getLowStock,
  deleteProduct,
  findProductById,
  updateProduct,
  getTotalStockValue,
  getStockValueByManufacturer,
  getManufacturers,
  getStockValuesForAllManufacturers,
  findExistingProduct,
};
