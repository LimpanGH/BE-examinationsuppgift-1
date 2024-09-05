const mongoose = require('mongoose');


const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
console.log();

module.exports = mongoose;
