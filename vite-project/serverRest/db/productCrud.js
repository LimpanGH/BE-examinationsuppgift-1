const ProductModel = require("./models/productModel");

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

module.exports = { createProduct };
