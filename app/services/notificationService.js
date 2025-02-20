import notificationModel from "../models/notificationModel.js";
import NotificationService from "../utile.js/mailer.js"
import garageModel from '../models/garageModel.js';
const notificationService = {
    createnotification: async (req, res) => {
        const notification = new NotificationService();
        try {
            const userRequest = req.body;
            const newNotification = new notificationModel({
                ...userRequest,
                status: "Pending",
            });

            await newNotification.save();
            const populatedNotification = await notificationModel
                .findById(newNotification._id)
                .populate({
                    path: 'garageUserId',
                    select: 'garageName email',
                    model: 'Garage'
                })
                .populate({
                    path: 'userId',
                    select: 'name email',
                    model: 'User'
                })
                .lean();
            notification.notifyToGarage(
                populatedNotification.garageUserId.email,
                populatedNotification.userId.name,
                populatedNotification.message,
                populatedNotification.contact,
                populatedNotification.serviceType,
                populatedNotification.vehicleType
            );
            return { status: 200, message: "success", data: newNotification };
        } catch (error) {
            return { status: 400, message: error.message, data: {} };
        }
    },
    getnotification: async (req, res) => {
        try {
            const { garageUserId } = req.query;
            const notifications = await notificationModel.find({ garageUserId: garageUserId }).populate({ path: 'userId', select: 'name email' }).lean().sort({
                createdAt: -1
            })
            return { status: 200, message: "success", data: notifications };
        } catch (error) {
            return { status: 400, message: error.message, data: {} };
        }
    },
    updatenotification: async (req, res) => {
        const sendnotification = new NotificationService();
        try {
            const { notificationId, status } = req.body;
            if (!["Accepted", "Rejected", "Completed"].includes(status)) {
                return res.status(400).json({ error: "Invalid status value" });
            };
            const notification = await notificationModel.findByIdAndUpdate(
                notificationId,
                { status },
                { new: true }
            ).populate({
                path: 'garageUserId',
                select: 'garageName email',
                model: 'Garage'
            })
                .populate({
                    path: 'userId',
                    select: 'name email',
                    model: 'User'
                }).lean();
            if (!notification) {
                return { status: 400, message: "Notification not found", data: {} };
            }
            if (status === "Accepted") {
                sendnotification.requestStatus(
                    notification.userId.email,           // Customer email
                    notification.garageUserId.garageName, // Garage name
                    status,
                    notification.serviceType,
                    notification.vehicleType
                );
            } else if (status === "Rejected") {
                sendnotification.requestStatus(
                    notification.userId.email,
                    notification.garageUserId.garageName,
                    status,
                    notification.serviceType,
                    notification.vehicleType
                );
            } else if (status === "Completed") {
                sendnotification.requestStatus(
                    notification.userId.email,
                    notification.garageUserId.garageName,
                    status,
                    notification.serviceType,
                    notification.vehicleType
                );
            }
            return { status: 200, message: "success", data: notification };
        } catch (error) {
            return { status: 400, message: error.message, data: {} };
        }
    },
}

export default notificationService