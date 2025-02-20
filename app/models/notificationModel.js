import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User who made the request
            required: true,
        },
        garageUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GarageUser", // Reference to the Garage User receiving the request
            required: true,
        },
        contact: {
            type: String,
            required: true,// Example service types
        },
        serviceType: {
            type: String,
            required: true,// Example service types
        },

        vehicleType: {
            type: String,
            required: true,// Example service types
        },
        status: {
            type: String,
            default: "Pending", // Default status is Pending
        },
        message: {
            type: String,
            default: "New service request from a user.",
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
