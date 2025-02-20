import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router()

router.post('/login', authController.login);
router.post('/login/garage', authController.garageUserLogin);
router.post('/userregistration', authController.userRegistration)

export default router;