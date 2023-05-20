// Creating a router instance
const router = require('express').Router();

// Importing user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Defining endpoints for user and thought routes
router.use('/user',userRoutes);
router.use('/thought',thoughtRoutes);

module.exports = router;