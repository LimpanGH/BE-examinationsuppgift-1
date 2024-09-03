const mongoose = require('./db'); // Import mongoose
const Schema = mongoose.Schema; // Define Schema from mongoose

// Define the Contact schema
const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

// Define the Manufacturer schema
const ManufactureSchema = new Schema({
  name: String,
  country: String,
  website: String,
  description: String,
  address: String,
  contact: ContactSchema, // Reference the ContactSchema
});

// Define the Product schema
const ProductSchema = new Schema({
  name: String,
  sku: Number, // Stock Keeping Unit
  description: String,
  price: Number,
  category: String,
  manufacturer: ManufactureSchema, // Reference the ManufactureSchema
  amountInStock: Number,
});

// Create the Product model
const Product = mongoose.model('Product', ProductSchema);

// module.exports = Product; // Export the model
module.exports = { Product };
