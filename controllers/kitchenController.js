
// controllers/kitchenController.js
const db = require('../config/db');

// GET /orders/kitchen - Get all orders for the kitchen (Pending or In Progress)
exports.getKitchenOrders = (req, res) => {
  const query = 'SELECT * FROM orders WHERE order_status IN ("Pending", "In Progress")';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No orders available for the kitchen' });
    }

    res.status(200).json(results); // Return orders with Pending and In Progress status
  });
};

// GET /orders/kitchen/{order_id} - Get a specific order by ID for the kitchen
exports.getKitchenOrderById = (req, res) => {
  const { order_id } = req.params;

  const query = 'SELECT * FROM orders WHERE order_id = ?';
  db.query(query, [order_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(results[0]); // Return the order details
  });
};
