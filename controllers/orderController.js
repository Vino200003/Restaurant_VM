const { Router } = require('express');
const db = require('../config/db');

// POST /orders - Create an order
exports.createOrder = (req, res) => {
    const { customer_id, order_type, total_amount } = req.body;

    const query = 'INSERT INTO Orders (customer_id, order_type, total_amount) VALUES (?, ?, ?)';
    db.query(query, [customer_id, order_type, total_amount], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({
            message: 'Order created successfully',
            order_id: results.insertId
        });
    });
};


//get orders by order id
exports.getOrderById = (req, res) => {
    const { order_id } = req.params;

    const query = 'SELECT * FROM Orders WHERE order_id=?';
    db.query(query, [order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if(results.length === 0){
            return res.status(404).json({message: 'Order not found'});
        }

        res.status(200).json(results[0]);
    });
};


exports.updateOrderStatus = (req, res) => {
    const { order_id } = req.params;
    const { order_status } = req.body;

    const query = 'UPDATE Orders SET order_status = ? WHERE order_id = ?';
    db.query(query, [order_status, order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully' });
    });
};


//GET orders using customerId
exports.getOrdersByCustomer = (req, res) => {
    const { customer_id } = req.params;
  
    const query = 'SELECT * FROM `orders` WHERE customer_id = ?';
    db.query(query, [customer_id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No orders found for this customer' });
      }
  
      res.status(200).json(results);
    });
  };



  