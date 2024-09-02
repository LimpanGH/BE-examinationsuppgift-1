// //Load environment variables
// import dotenv from 'dotenv';

// // Import required packages
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';

// //Import routes
// // const productsRouter = require('./routes/productRoute');
// import productsRouter from './routes/productRoute';

// // Initialize express app
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json()); // Parse JSON boides
// app.use(cors()); // Enable cors

// // Routes
// app.use('/products', productsRouter);

// // MongoDB connection URI
// const uri = process.env.MONGODB_URI;

// mongoose
//   .connect(uri, {})
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err: any) => {
//     console.error('Error connecting to MongoDB:', err);
//   });
// console.log();

// app.listen(port, () => {
//   console.log(`Server is running on port http://localhost:${port}`);
// });


// Load environment variables
import dotenv from 'dotenv';
dotenv.config(); // Ensure this is called to load env variables

// Import required packages
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Import routes
import productsRouter from './routes/productRoute';

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Routes
app.use('/products', productsRouter);

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MongoDB URI is not defined in the environment variables.');
}

mongoose
  .connect(uri, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: any) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
