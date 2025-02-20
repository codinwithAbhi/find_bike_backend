import mongoose from "mongoose";

const garageSchema = new mongoose.Schema(
    {
        garageName: {
            type: String,
            trim: true,
            required: [true, "garageName is required"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "email is required"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "password is required"],
        },
        contact: {
            type: String,
            trim: true,
            required: [true, "contact is required"],
        },
        address: {
            type: String,
            trim: true,
            required: [true, "Address is required"],
        },
        serviceType: {
            type: [String], // Array of service types
            required: [true, "At least one service type is required"],
        },
        vehicleType: {
            type: String, // Bike or Car
            required: [true, "Vehicle type is required"],
        },
        latitude: {
            type: Number,
            required: [true, "Latitude is required"],
        },
        longitude: {
            type: Number,
            required: [true, "Longitude is required"],
        },
        image: {
            type: String, // Image path (relative URL)
            required: [true, "Image is required"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Garage = mongoose.model("Garage", garageSchema);

export default Garage;
