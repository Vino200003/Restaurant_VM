const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/orders/:order_id', orderController.getOrderById);
router.put('/orders/:order_id', orderController.updateOrderStatus);
router.get('/orders/customer/:customer_id', orderController.getOrdersByCustomer);

module.exports = router;