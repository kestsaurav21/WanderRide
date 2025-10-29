const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    
        name: {
            type: String,
            required: true, 
        },
        type: {
            type: String,
            enum: ['car', 'bike', 'scooty'],
            required: true

        },

        brand: {
            type: String,
            required: true
        },
        pricePerDay: {
            type: Number,
            required: true
            
        },
        available: {
            type: Boolean,
            default: true,
        },
        imageUrls: [
            {
                type: String
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    
}, { timestamps: true })

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;