const ProductModel = require('./models/productModel');

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

const getProducts = async (product) => {
  return ProductModel.find();
};

module.exports = { createProduct, getProducts };
