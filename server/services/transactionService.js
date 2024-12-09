// services/transactionService.js
const Transaction = require('../models/transactionModel'); // Ensure the path is correct

const listTransactions = async (page, perPage, search) => {
  try {
    // Define the filter for search (if a search term is provided)
    const filter = search ? { $text: { $search: search } } : {}; 

    // Fetch transactions with pagination
    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)  // Skip records based on page and perPage
      .limit(perPage);             // Limit the number of records per page

    // Get total count of matching records
    const totalRecords = await Transaction.countDocuments(filter);

    return { transactions, totalRecords };
  } catch (error) {
    throw new Error('Error fetching transactions: ' + error.message);
  }
};

module.exports = { listTransactions };
