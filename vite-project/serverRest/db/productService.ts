// const ProductModel = require('./models/productModel');

// const createProduct = async (product) => {
//   const newProduct = new ProductModel(product);
//   return newProduct.save();
// };

// const getProducts = async (product) => {
//   return ProductModel.find();
// };

// const deleteProduct = async (id) => {
//   return ProductModel.findByIdAndDelete(id);
// };

// const findProductById = async (id) => {
//   return ProductModel.findById(id);
// };

// module.exports = { createProduct, getProducts, deleteProduct, findProductById };


import ProductModel from './models/productModel';

// Type for product (optional, inferred from schema)
interface Product {
  name: string;
  sku: number;
  description: string;
  price: number;
  category: string;
  manufacturer: any; // Replace 'any' with appropriate type if needed
  amountInStock: number;
}

export const createProduct = async (product: Product) => {
  const newProduct = new ProductModel(product);
  return newProduct.save();
};

export const getProducts = async () => {
  return ProductModel.find();
};

export const deleteProduct = async (id: string) => {
  return ProductModel.findByIdAndDelete(id);
};

export const findProductById = async (id: string) => {
  return ProductModel.findById(id);
};
