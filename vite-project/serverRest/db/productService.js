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

module.exports = {
  createProduct,
  getProducts,
  getLowStock,
  getCriticalStock,
  deleteProduct,
  findProductById,
};
