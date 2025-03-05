// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) return res.status(403).json({ message: 'Access denied, token is missing' });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // Attach user info from the token to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
