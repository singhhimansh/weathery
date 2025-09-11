import express from "express";
import {weather} from "./routes/weather.js";

// main router to handle all routes (.i.e /api)
const router = express.Router();

// adding weather (i.e. /api/weather) route to the main router 
router.get("/test", (req, res) => {
    res.send("Test");
});  
router.use("/weather", weather);  

export default router;
