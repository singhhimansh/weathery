import express from "express";
import {weather} from "./routes/weather.js";

// main router to handle all routes (.i.e /api)
const router = express.Router();

// adding weather (i.e. /api/weather) route to the main router 
router.use("/weather", weather);  

export default router;
