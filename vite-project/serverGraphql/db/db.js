const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
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
