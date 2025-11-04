const Vehicle = require("../models/vehicle");

const addVehicle = async (req, res) => {

  console.log(req.body);
  
  try {
    const { name, type, brand, registrationNumber, pricePerDay, images } =
      req.body;

    if (
      !name ||
      !type ||
      !brand ||
      !registrationNumber ||
      !pricePerDay ||
      !images?.length
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingVehicle = await Vehicle.findOne({ registrationNumber });

    if(existingVehicle) {
      return res
        .status(400)
        .json({ success: false, message: "Vehicle already exists." });
    }

    const newVehicle = new Vehicle({
      name,
      type,
      brand,
      registrationNumber,
      pricePerDay,
      images,
      createdBy: req.user?.id || null,
    });

    await newVehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle Added Successfully!",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("❌ Error adding vehicle:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};




module.exports = { addVehicle };
