import express from "express";
import garageController from "../controllers/garageController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// Route: GET /api/garages/nearby
router.get("/nearby", garageController.getNearbyGarages);
router.post('/garageregistration', upload.single('image'), garageController.garageRegistration)

export default router;
