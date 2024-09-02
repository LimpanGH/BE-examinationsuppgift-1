require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;

app.use(express.json());

app.listen(port, () => {
  console.log(`Running a GraphQl server on port http://localhost:${port}`);
});

//app.use("/graphql", require("./routes/graphql"));
