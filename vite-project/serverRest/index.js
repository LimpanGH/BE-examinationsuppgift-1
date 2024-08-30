require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/productRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("api/products", productsRouter);

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
  console.log(`Server is running on port http://localhost:${port}`);
});
