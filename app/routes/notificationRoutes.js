import express from "express";
import notificationController from "../controllers/notificationController.js";

const router = express.Router()

router.post('/createnotification', notificationController.createnotification);
router.get('/getnotification', notificationController.getnotification);
router.post('/updatenotification', notificationController.updatenotification)

export default router;