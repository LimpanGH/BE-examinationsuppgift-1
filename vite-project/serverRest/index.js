//Load environment variables
require("dotenv").config();

// Import required packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Import routes
const productsRouter = require("./routes/productRoute");

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON boides
app.use(cors()); // Enable cors

// Routes
app.use("/products", productsRouter);

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
console.log();

app.listen(port, () => {
  console.log(`Rest API Server is running on port http://localhost:${port}`);
});
