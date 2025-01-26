import express, { query } from "express";
import { ApiError } from "../../coreutils/error.js";
import weatherInstance from "../../coreutils/axios.js";
import services from "../../services/services.js";
import { addUnitSuffixes, pick } from "../../coreutils/common.utils.js";
import { isAxiosError } from "axios";


// mapping of the required weather data to be picked from to the response object
const keyMap = {
  name: "name",
  weather: "weather.0.main",
  desciption: "weather.0.description",
  iconId: "weather.0.icon",
  humidity: "main.humidity",
  percievedTemp: "main.feels_like",
  pressure: "main.pressure",
  temp: "main.temp",
  clouds: "clouds.all",
  country: "sys.country",
  visibility: "visibility",
  windSpeed: "wind.speed",
};

// suffix to be appended to the weather data 
const unitSuffix = {
  humidity: "%",
  percievedTemp: "°C",
  pressure: "hPa",
  temp: "°C",
  clouds: "%",
  windSpeed: "m/s",
  visibility: "m",
};

const router = express.Router();

// /api/weather/ endpoint
router.get("/", async (req, res, next) => {
  try {
    const { city, lon, lat } = req.query;
    let params = {};
    if(lon && lat){
        params={lat, lon};
    };
    if(city){
        params={q: city};
    }
    // if no city or coordinates are provided, throw an error
    if (!city && !lon && !lat) {
      throw new ApiError("Enter a valid city", 400);
    }


    // making request to open weather api using axios instance with queryparameters
    const weatherData = await weatherInstance.get(services.openWeatherCurrent, {
      params,
    });

    // picking required data from the response 
    let filteredData = pick(weatherData.data, keyMap);

    // appending icon url 
    if (services.weatherIconUrl)
      filteredData.icon =
        services.weatherIconUrl + filteredData.iconId + "@4x.png";
    
    // appending suffixes to the picked values
    let weatherDetails = addUnitSuffixes(filteredData, unitSuffix);

    // sending the response
    res.json(weatherDetails);
  } catch (error) {
    let err = error;
    // if the error is an axios error, convert it to ApiError (open weather api issue)
    if(isAxiosError(err)){
      console.error("Axios error:", JSON.stringify(err));
      err= new ApiError(err?.response?.data?.message, Number(err?.response?.data?.cod));
    }
    // pass unrecognised errors to the error handler middleware
    next(err);
  }
});

export { router as weather };
