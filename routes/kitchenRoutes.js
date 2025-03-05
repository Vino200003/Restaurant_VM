

// routes/kitchenRoutes.js
const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/kitchenController');

// GET /orders/kitchen - Get all orders for the kitchen (Pending or In Progress)
router.get('/orders/kitchen', kitchenController.getKitchenOrders);

// GET /orders/kitchen/{order_id} - Get a specific order by ID for the kitchen
router.get('/orders/kitchen/:order_id', kitchenController.getKitchenOrderById);

module.exports = router;
