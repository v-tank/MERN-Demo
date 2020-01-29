// import packages and routes
const express = require('express');
const router = express.Router();
const locationRoutes = require('./api/location');

// use the location routes file at the /api/location route
router.use("/api/location", locationRoutes);

module.exports = router;