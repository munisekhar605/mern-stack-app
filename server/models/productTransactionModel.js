const mongoose = require('mongoose');

// Define the schema for product transaction
const productTransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  dateOfSale: { type: Date, required: true },  // Assuming it's in ISO format, but could be String if necessary
  sold: { type: Boolean, default: false },
});

// Create the model
const ProductTransaction = mongoose.model('ProductTransaction', productTransactionSchema);

module.exports = ProductTransaction;
