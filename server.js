// server.js
const app = require('./app');  // Import app.js for routing and middleware

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
