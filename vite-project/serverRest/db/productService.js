const ProductModel = require('./models/productModel');

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

const getProducts = async (product) => {
  return ProductModel.find();
};

const getLowStock = async () => {
  const products = await ProductModel.find({ amountInStock: { $lt: 10 } }).exec();
  console.log('Low stock products:', products);
  return products;
};

const getCriticalStock = async () => {
  const products = await ProductModel.find({ amountInStock: { $lt: 3 } }).exec();
  console.log('Critical stock products:', products);
  return products;
};

const deleteProduct = async (id) => {
  return ProductModel.findByIdAndDelete(id);
};

const findProductById = async (id) => {
  return ProductModel.findById(id);
};

const updateProduct = async (id, product) => {
  return ProductModel.findByIdAndUpdate;
};

const getTotalStockValue = async () => {
  const products = await getProducts();
  const totalStockValue = products.reduce(
    (total, product) => total + product.price * product.amountInStock,
    0
  );
  return totalStockValue;
};

const getStockValueByManufacturerId = async (manufacturerId) => {
  const products = await getProducts();
  const stockValue = products
    .filter((product) => product.manufacturer._id.toString() === manufacturerId)
    .reduce((total, product) => total + product.price * product.amountInStock, 0);
  return stockValue;
};

const getManufacturers = async () => {
  return ProductModel.find({ manufacturer: { $exists: true } }, { "manufacturer.name": true, _id: false });
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
  getStockValueByManufacturerId,
  getManufacturers,
};
