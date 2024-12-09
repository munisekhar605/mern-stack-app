const transactionService = require('../services/transactionService');
const Transaction = require('../models/transactionModel');  // Adjust the path as necessary


const initializeDatabase = async () => {
  try {
    console.log("Initializing database...");
    // Assume you're doing something like creating collections or setting up indexes
    await Transaction.createIndexes(); // If you're using MongoDB for text search, for example
    console.log("Database initialized successfully");
  } catch (error) {
    console.error('Error initializing database:', error);
    throw new Error('Failed to initialize the database');
  }
};

const listTransactions = async (req, res) => {
  let { page = 1, perPage = 10, search = '' } = req.query;

  console.log(`Request parameters: page=${page}, perPage=${perPage}, search=${search}`);  // Log the raw parameters

  // Ensure page and perPage are valid numbers
  page = parseInt(page, 10);
  perPage = parseInt(perPage, 10);

  // Validate that page and perPage are positive integers
  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(perPage) || perPage <= 0) perPage = 10;

  try {
    const { transactions, totalRecords } = await transactionService.listTransactions(page, perPage, search);
    res.status(200).json({ data: transactions, totalRecords, page, perPage });
  } catch (error) {
    console.error('Error in listTransactions controller:', error.message);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
};
