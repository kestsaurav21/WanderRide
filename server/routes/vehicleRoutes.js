const express = require('express');
const isAuthenticated = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/roleMiddleware');
const { addVehicle } = require('../controllers/vehicleController');

const router = express.Router();

router.post('/add', isAuthenticated, isAdmin, addVehicle);



module.exports = router;