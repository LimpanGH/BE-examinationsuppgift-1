const ProductModel = require('./models/productModel');

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

const getProducts = async (product) => {
  return ProductModel.find();
};

const deleteProduct = async (id) => {
  return ProductModel.findByIdAndDelete(id);
};

const findProductById = async (id) => {
  return ProductModel.findById(id);
};

module.exports = { createProduct, getProducts, deleteProduct, findProductById };
