import axios from "axios";
import { ApiError } from "./error.js";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.OPEN_WEATHER_API_URL;
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

// Create an axios instance for open weather api
const weatherInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

// request interceptor to append Api key and units parameter to all requests to weather api
weatherInstance.interceptors.request.use(function (config) {
  if (!openWeatherApiKey)
    throw new ApiError("Unauthorized access to open weather api", 401);
  config.params = {
    ...config.params,
    units: "metric",
    appid: openWeatherApiKey,
  };
  return config;
});
export default weatherInstance;
