// app.js
const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');  // Import customer routes
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the customer routes for all /api endpoints
app.use('/api', customerRoutes);
app.use('/api', orderRoutes);


module.exports = app;

//gjhjhkljkljkljlkjjljll