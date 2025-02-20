import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import garageRoutes from "./app/routes/garageRoutes.js";
import auth from './app/routes/authRoutes.js'
import notificationRoutes from "./app/routes/notificationRoutes.js"
import morgan from "morgan";
import connectDB from "./app/config/db.js";
import http from "http";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "upload/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static images correctly using absolute path
app.use('/images', express.static(uploadDir));  // [CHANGED!] Use absolute path

// Routes
app.use("/api/garages", garageRoutes);
app.use("/api/auth", auth);
app.use("/api/notification", notificationRoutes)

// Start the server
let Server = http.createServer(app);
Server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
