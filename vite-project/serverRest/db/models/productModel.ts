// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ContactSchema = new Schema({
//   name: String,
//   email: String,
//   phone: String,
// });

// const ManufactureSchema = new Schema({
//   name: String,
//   country: String,
//   website: String,
//   description: String,
//   address: String,
//   contact: ContactSchema,
// });

// const ProductSchema = new Schema({
//   name: String,
//   sku: Number, // Stock Keeping Unit
//   description: String,
//   price: Number,
//   category: String,
//   manufacturer: ManufactureSchema,
//   amountInStock: Number,
// });

// const ProductModel = mongoose.model('Product', ProductSchema);
// module.exports = ProductModel;


import mongoose, { Schema, Document, Model } from 'mongoose';

// Define TypeScript interfaces for the schemas
interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
}

interface IManufacturer extends Document {
  name: string;
  country: string;
  website: string;
  description: string;
  address: string;
  contact: IContact;
}

interface IProduct extends Document {
  name: string;
  sku: number;
  description: string;
  price: number;
  category: string;
  manufacturer: IManufacturer;
  amountInStock: number;
}

// Create Schemas
const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const ManufacturerSchema = new Schema<IManufacturer>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  website: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  contact: { type: ContactSchema, required: true },
});

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  sku: { type: Number, required: true, unique: true }, // Stock Keeping Unit
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  manufacturer: { type: ManufacturerSchema, required: true },
  amountInStock: { type: Number, required: true },
});

// Create and export the model
const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
