// app.js
const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');  // Import customer routes
const orderRoutes = require('./routes/orderRoutes');        // Import order routes
const kitchenRoutes = require('./routes/kitchenRoutes');

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the customer routes for all /api endpoints
app.use('/api', customerRoutes);

// Use the order routes for all /api endpoints
app.use('/api', orderRoutes);

// Use the kitchen routes for all /api endpoints
app.use('/api', kitchenRoutes);

module.exports = app;
