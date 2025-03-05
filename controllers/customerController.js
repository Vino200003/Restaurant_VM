const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /customers/register
exports.registerCustomer = async (req, res) => {
  const { first_name, last_name, email, phone_number, address, city, password } = req.body;

  // Check if customer already exists
  const query = 'SELECT * FROM Customer WHERE email = ? OR phone_number = ?';
  // In the registerCustomer method:
db.query(query, [email, phone_number], (err, results) => {
  if (err) {
    console.error('Database query error:', err);  // Log the database query error
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
  if (results.length > 0) {
    return res.status(400).json({ message: 'Email or Phone number already in use' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Password hashing error:', err);  // Log the password hashing error
      return res.status(500).json({ message: 'Password hashing error', error: err.message });
    }

    const insertQuery = 'INSERT INTO Customer (first_name, last_name, email, phone_number, address, city, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [first_name, last_name, email, phone_number, address, city, hashedPassword], (err, results) => {
      if (err) {
        console.error('Database insert error:', err);  // Log the insert error
        return res.status(500).json({ message: 'Error inserting data into database', error: err.message });
      }

      res.status(201).json({
        message: 'Customer registered successfully',
        customer_id: results.insertId
      });
    });
  });
});
};


// POST /customers/login
exports.loginCustomer = (req, res) => {
    const { email, password } = req.body;
  
    // Find the customer by email
    const query = 'SELECT * FROM Customer WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: 'Customer not found' });
      }
  
      const customer = results[0];
  
      // Compare passwords
      bcrypt.compare(password, customer.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Password comparison error' });
        }
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        // Generate JWT token
        const token = jwt.sign(
          { customer_id: customer.customer_id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
  
        res.status(200).json({
          message: 'Login successful',
          token
        });
      });
    });
  };

// GET /customers/{customer_id}
exports.getCustomerProfile = (req, res) => {
  const { customer_id } = req.params;

  const query = 'SELECT * FROM Customer WHERE customer_id = ?';
  db.query(query, [customer_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const customer = results[0];
    res.status(200).json({
      customer_id: customer.customer_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone_number: customer.phone_number,
      address: customer.address,
      city: customer.city,
      street: customer.street
    });
  });
};



// PUT /customers/{customer_id}
exports.updateCustomerProfile = (req, res) => {
  const { customer_id } = req.params;
  const updates = req.body;

  // Build the query dynamically
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);
  values.push(customer_id);

  const query = `UPDATE Customer SET ${fields} WHERE customer_id = ?`;
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer profile updated successfully' });
  });
};


