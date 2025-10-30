const Vehicle = require("../models/vehicle");

// Add new vehicle (Admin only)

const addVehicle = async (req, res) => {
  try {
    // 1️⃣ Validate required fields

    const {
      name,
      type,
      registrationNumber,
      brand,
      pricePerDay,
      available,
      imageUrls,
    } = req.body;

    if (!name || !type || !brand || !pricePerDay || !registrationNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // check if the same registration number vehicle exist

    const existingVehicle = await Vehicle.findOne({ registrationNumber });

    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "A vehicle with this registration number already exists.",
      });
    }

    // 2️⃣ Get the admin's ID from req.user (set by authMiddleware)

    const adminId = req.user.id;

    const newVehicle = new Vehicle({
      name,
      type,
      registrationNumber,
      brand,
      pricePerDay,
      available,
      imageUrls,
      createdBy: adminId,
    });

    await newVehicle.save();

    res.status(201).json({
      success: true,
      message: "✅ Vehicle added successfully!!",
      data: {
        name: newVehicle.name,
        type: newVehicle.type,
        brand: newVehicle.brand,
        registrationNumber: newVehicle.registrationNumber,
        createdBy: newVehicle.createdBy,
      },
    });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const getAllVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate(
      "createdBy",
      "name email role"
    );

    //check user role from token
    //Admin -> show everything

    if (req.user && req.user.role === "admin") {
      return res.status(200).json({
        success: true,
        count: vehicles.length,
        data: vehicles,
      });
    } else {
      //User - show limited details of vehicle

      const filteredVehicles = vehicles.map((v) => ({
        _id: v._id,
        name: v.name,
        registrationNumber: v.registrationNumber,
        category: v.category,
        price: v.price,
        imageUrls: v.imageUrls,
      }));

      return res.status(200).json({
        success: true,
        count: filteredVehicles.length,
        data: filteredVehicles,
      });
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }
};


const updateVehicle = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, category, price, imageUrls, registrationNumber } = req.body;

        //find vehicle by ID

        const vehicle = await Vehicle.findById(id);

        if(!vehicle){
        return res.status(404).json({
            success: false,
            message: "Vehicle not found",
        });
        }

        //Update the vehicle info

        if (name) vehicle.name = name;
        if (category) vehicle.category = category;
        if (price) vehicle.price = price;
        if (imageUrls) vehicle.imageUrls = imageUrls;
        if (registrationNumber) vehicle.registrationNumber = registrationNumber;

        const updatedVehicle = await vehicle.save();

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: updatedVehicle,
        });


        
    } catch (error) {

        console.error("Error updating vehicle:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating vehicle",
        });
        
    }

}




module.exports = { addVehicle, getAllVehicle, updateVehicle,  };
