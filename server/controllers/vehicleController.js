const Vehicle = require('../models/vehicle');

// Add new vehicle (Admin only)

const addVehicle = async (req, res) => {

    try {

    // 1️⃣ Validate required fields

        const { name, type, brand, pricePerDay, available, imageUrls } = req.body;

        if (!name || !type || !brand || !pricePerDay) {
            res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

    // 2️⃣ Get the admin's ID from req.user (set by authMiddleware)
    
    const adminId = req.user.id;

    const newVehicle = new Vehicle ({
        name,
        type,
        brand,
        pricePerDay,
        available,
        imageUrls,
        createdBy: adminId,
    })

    await newVehicle.save();

    res.status(201).json({
        success: true,
        message: "✅ Vehicle added successfully!!",
        data: {
            name: newVehicle.name,
            type: newVehicle.type,
            brand: newVehicle.brand,
            createdBy: newVehicle.createdBy
        }
    })
        
        
    } catch (error) {

        console.error("Error adding vehicle:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
        
    }

}



module.exports = { addVehicle }