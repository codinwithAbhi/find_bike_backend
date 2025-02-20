import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'
import garageModel from "../models/garageModel.js"


const authService = {
    login: async ({ body }) => {
        try {
            let userEmail = body.email.trim();
            const user = await userModel.findOne({ email: userEmail }).lean();
            if (!user) {
                return {
                    status: 400,
                    message: "Email dose not exist",
                    data: {}
                };
            };
            if (user && body.password == user.password) {
                let token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.KWT_KEY);
                return {
                    status: 200,
                    message: "User login Successfully",
                    data: { token }
                }
            } else {
                return {
                    status: 400,
                    message: "Incorrect email and password",
                    data: {}
                }
            }

        } catch (error) {
            return { status: 400, message: error.message, data: {} };
        }
    },
    garageUserLogin: async ({ body }) => {
        try {
            let userEmail = body.email.trim();
            const user = await garageModel.findOne({ email: userEmail }).lean();
            if (!user) {
                return {
                    status: 400,
                    message: "Email dose not exist",
                    data: {}
                };
            };
            if (user && body.password == user.password) {
                let token = jwt.sign({ _id: user._id, name: user.garageName , email: user.email, address: user.address, vehicleType: user.vehicleType, contact: user.contact,serviceType:user.serviceType }, process.env.KWT_KEY);
                return {
                    status: 200,
                    message: "User login Successfully",
                    data: { token }
                }
            } else {
                return {
                    status: 400,
                    message: "Incorrect email and password",
                    data: {}
                }
            }

        } catch (error) {
            return { status: 400, message: error.message, data: {} };
        }
    },
    userRegistration: async ({ body }) => {
        try {
            let userEmail = body.email.trim();
            const user = await userModel.findOne({ email: userEmail }).lean();
            if (user) {
                return {
                    status: 400,
                    message: "Email already exist",
                    data: {}
                }
            };
            const data = new userModel(body)
            await data.save();
            return { status: 200, message: "success", data: data };
        } catch (error) {
            return { status: 400, message: error.message, data: {} };
        }
    }
}

export default authService;