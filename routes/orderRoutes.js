const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /orders - Create an order
router.post('/orders', orderController.createOrder);

// GET /orders/{order_id} - Get a specific order by order_id
router.get('/orders/:order_id', orderController.getOrderById);

// PUT /orders/{order_id} - Update the order status
router.put('/orders/:order_id', orderController.updateOrderStatus);

// GET /orders/customer/{customer_id} - Get all orders for a customer
router.get('/orders/customer/:customer_id', orderController.getOrdersByCustomer);


module.exports = router;
