const express = require("express");


// Controllers

const { addVehicle, getAllVehicle, updateVehicle } = require("../controllers/vehicleController");



// Middlewares

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();


// ✅ Routes


// Add new vehicle (only admin)
router.post("/addVehicle", authMiddleware, adminMiddleware, addVehicle);

//Get all vehicles (open for all logged-in users)
router.get('/getAllVehicles', authMiddleware, getAllVehicle)

//Update the vehicle(only admin)
router.put('/updateVehicle/:id', authMiddleware, adminMiddleware, updateVehicle)



module.exports = router;
