import authService from "../services/authService.js";

const authController = {
    login: async (req, res) => {
        try {
            const response = await authService.login(req);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },

    userRegistration: async (req, res) => {
        try {
            const response = await authService.userRegistration(req);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },
    garageUserLogin : async (req, res) => {
        try {
            const response = await authService.garageUserLogin(req);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },
}


export default authController;