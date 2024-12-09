const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Initialize database route
router.post('/initialize', transactionController.initializeDatabase);

// List transactions with pagination and search
router.get('/transactions', transactionController.listTransactions);

module.exports = router;
