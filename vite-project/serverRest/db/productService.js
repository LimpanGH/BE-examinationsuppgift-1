const ProductModel = require("./models/productModel");

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

<<<<<<< HEAD
const deleteProduct = async (id) => {
  return ProductModel.findByIdAndDelete(id);
};

const findProductById = async (id) => {
  return ProductModel.findById(id);
};

module.exports = { createProduct, deleteProduct, findProductById };
=======
const getProducts = async (product) => {
  return ProductModel.find();
};

<<<<<<< HEAD
module.exports = { createProduct, getProducts };
>>>>>>> 56610b6 (organized server setup in index.js and added GET method in productService.js aswell as in productRoute.js)
=======
const deleteProduct = async (id) => {
  return ProductModel.findByIdAndDelete(id);
};

const findProductById = async (id) => {
  return ProductModel.findById(id);
};

module.exports = { createProduct, getProducts, deleteProduct, findProductById };
>>>>>>> 95b04d4 (readded Anders changes and added functionality to search by Id in browser)
