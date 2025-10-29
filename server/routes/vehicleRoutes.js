const express = require('express');
const { addVehicle } = require('../controllers/vehicleController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();



router.post('/addVehicle', authMiddleware, adminMiddleware,  addVehicle);

module.exports = router;