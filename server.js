// Below I have imported the required packages and files
const express =  require('express');
const db = require('./config/connection');
const routes = require('./routes');
// Setting up environment variables
const PORT = process.env.PORT || 3002;
const app = express();
// Using middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Using routes defined in routes.js
app.use(routes); 
// Connecting to the MongoDB database and start the server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });