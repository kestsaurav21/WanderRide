const express = require("express");


// Controllers

const { addVehicle, getAllVehicle } = require("../controllers/vehicleController");



// Middlewares

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();


// ✅ Routes


// Add new vehicle (only admin)
router.post("/addVehicle", authMiddleware, adminMiddleware, addVehicle);

//Get all vehicles (open for all logged-in users)
router.get('/getAllVehicles', authMiddleware, getAllVehicle)

module.exports = router;
