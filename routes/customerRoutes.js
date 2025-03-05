// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

// POST /customers/register
router.post('/customers/register', customerController.registerCustomer);

// POST /customers/login
router.post('/customers/login', customerController.loginCustomer);

// GET /customers/{customer_id} - Use middleware for authentication
router.get('/customers/:customer_id', authenticateToken, customerController.getCustomerProfile);

// PUT /customers/{customer_id} - Use middleware for authentication
router.put('/customers/:customer_id', authenticateToken, customerController.updateCustomerProfile);

module.exports = router;
