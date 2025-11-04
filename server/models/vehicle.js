const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },
    type: {
        type: String,
        enum: ["hatchback", "sedan", "suv"],
        required: [true, "Vehicle type is required"],
    },
    brand: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true })

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;