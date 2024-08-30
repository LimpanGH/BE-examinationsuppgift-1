// require('dotenv').config();
// const cors = require('cors');
// // app.use(express.json());

// // const example = require('./db/models/exampleModels');
// // const createExample = require('/db/exampleCrud');
// // const exampleRoutes = require('./db/routes/animalRoutes');

// // const paths = require('path');
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // app.use(bodyParser.json());
// app.use(express.json(), cors);




// const port = process.env.PORT || 3000;

// // app.use(express.static(paths, join(__dirname, 'public')));

// async function connectTodatabase() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {});
//     console.log('Connected to the database');
//   } catch (error) {
//     console.log('Error connecting to the databae', error);
//     process.exit(1);
//   }
// }

// connectTodatabase();

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require("./routes/productRoute")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/products", productsRouter);

// async function connectToDatabase() {
//   try {
//     console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging log
//     await mongoose.connect(process.env.MONGO_URI, {});
//     console.log('Connected to the database');
//   } catch (error) {
//     console.log('Error connecting to the database:', error);
//     process.exit(1);
//   }
// }

// connectToDatabase();

const uri = process.env.MONGODB_URI;
// const user = process.env.MONGODB_USER;
// const pass = process.env.MONGODB_PASS;
mongoose
  .connect(uri, {
  })
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
