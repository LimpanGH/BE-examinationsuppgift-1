// Run this script to generate test data by running the following command in the terminal: node scripts/generateTestData.js

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
const ProductModel = require("../db/models/productModel"); // Adjust the path as necessary

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    generateTestData();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function generateTestData() {
  try {
    // Clear existing data
    await ProductModel.deleteMany({});

    // Generate 150 manufacturers
    const manufacturers = [];
    for (let i = 0; i < 150; i++) {
      const contact = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      };

      const manufacturer = {
        name: faker.company.name(),
        country: faker.location.country(),
        website: faker.internet.url(),
        description: faker.lorem.sentence(),
        address: faker.location.streetAddress(),
        contact: contact,
      };

      manufacturers.push(manufacturer);
    }

    // Generate 1000 products
    const products = [];
    for (let i = 0; i < 1000; i++) {
      const product = {
        name: faker.commerce.productName(),
        sku: faker.number.int(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        manufacturer: manufacturers[faker.number.int({ min: 0, max: 149 })],
        amountInStock: faker.number.int({ min: 0, max: 1000 }),
      };

      products.push(product);
    }

    // Insert products into the database
    await ProductModel.insertMany(products);
    console.log("Test data generated successfully");
  } catch (error) {
    console.error("Error generating test data:", error);
  } finally {
    mongoose.connection.close();
  }
}
