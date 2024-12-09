// models/transactionModel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: { type: String },
  amount: { type: Number },
  date: { type: Date },
});

// Optional: Add an index for text search on description
transactionSchema.index({ description: 'text' });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
