import notificationService from "../services/notificationService.js";



const notificationController = {

    createnotification: async (req, res) => {
        try {
            const response = await notificationService.createnotification(req);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },
    getnotification: async (req, res) => {
        try {
            const response = await notificationService.getnotification(req);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },
    updatenotification: async (req, res) => {
        try {
            const response = await notificationService.updatenotification(req);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(400).send({ status: 400, message: error.message, data: {} });
        }
    },

}

export default notificationController