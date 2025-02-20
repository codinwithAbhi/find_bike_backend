import garageService from '../services/garageService.js'

const garageController = {
  getNearbyGarages: async (req, res) => {
    try {
      const response = await garageService.getNearByMeGarage(req);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message, data: {} });
    }
  },

  garageRegistration: async (req, res) => {
    try {
      const response = await garageService.registerGarage(req);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message, data: {} });
    }
  }
};


export default garageController;

