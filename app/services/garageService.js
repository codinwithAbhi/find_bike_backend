
import garageModel from '../models/garageModel.js';


const garageService = {
  registerGarage: async ({ body, file }) => {
    try {
      if (!file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const imageUrl = `/images/${file.filename}`;

      const newGarage = new garageModel({
        email: body.email,
        password: body.password,
        contact: body.contact,
        garageName: body.garageName,
        address: body.address,
        serviceType: JSON.parse(body.serviceType),
        vehicleType: body.vehicleType,
        latitude: body.latitude,
        longitude: body.longitude,
        image: imageUrl, // Store relative path in DB
      });

      await newGarage.save();


      return { status: 200, message: "success", data: newGarage };
    } catch (error) {
      return { status: 400, message: error.message, data: {} };
    }
  },

  getNearByMeGarage: async ({ query }) => {
    try {
      const { lat, lng } = query;

      if (!lat || !lng) {
        return { status: 400, message: "Latitude and Longitude are required", data: {} }; // [CHANGED!] Added error message
      }

      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      if (isNaN(userLat) || isNaN(userLng)) {
        return { status: 400, message: "Invalid Latitude or Longitude", data: {} }; // [CHANGED!] Added validation check
      }

      const garageData = await garageModel.find({}).lean();
      console.log(`Fetched ${garageData.length} garages from DB`);

      const EARTH_RADIUS = 6371000; // Radius of Earth in meters
      const MAX_DISTANCE = 1000; // 300 meters

      function calculateDistance(lat1, lng1, lat2, lng2) {
        const toRadians = (deg) => (deg * Math.PI) / 180;

        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
      }

      const filteredData = garageData.filter(garage => {
        const distance = calculateDistance(userLat, userLng, garage.latitude, garage.longitude);
        return distance <= MAX_DISTANCE;
      });

      console.log(`Filtered ${filteredData.length} garages within ${MAX_DISTANCE} meters`);

      return { status: 200, message: "success", data: filteredData };
    } catch (error) {
      return { status: 500, message: error.message, data: {} };
    }
  }


}

export default garageService