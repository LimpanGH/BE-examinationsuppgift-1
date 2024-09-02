const ProductModel = require("./models/productModel");

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
    .reduce(
      (total, product) => total + product.price * product.amountInStock,
      0
    );
  return stockValue;
};

const getManufacturers = async () => {
  return ProductModel.find({ manufacturer: { $exists: true } }, { "manufacturer.name": true, _id: false });
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  findProductById,
  updateProduct,
  getTotalStockValue,
  getStockValueByManufacturerId,
  getManufacturers,
};
