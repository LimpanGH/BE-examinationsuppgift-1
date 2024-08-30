const ProductModel = require("./models/productModel");

const createProduct = async (product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

const deleteProduct = async (id) => {
  return ProductModel.findByIdAndDelete(id);
};

module.exports = { createProduct, deleteProduct };
