import request from "supertest";
import express from "express";
import { weather } from "../../../api/routes/weather";
import weatherInstance from "../../../coreutils/axios";
import services from "../../../services/services";
import { ApiError } from "../../../coreutils/error";

const app = express();
app.use(express.json());
app.use("/api/weather", weather);

jest.mock("../../../coreutils/axios.js");

describe("GET /api/weather", () => {
  it("should return weather details for a valid city", async () => {
    const mockResponse = {
      data: {
        name: "Agra",
        weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
        main: { humidity: 50, feels_like: 20, pressure: 1012, temp: 22 },
        clouds: { all: 0 },
        sys: { country: "GB" },
        visibility: 10000,
        wind: { speed: 3.6 },
      },
    };

    weatherInstance.get.mockResolvedValue(mockResponse);

    const res = await request(app).get("/api/weather").query({ city: "Agra" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: "Agra",
      weather: "Clear",
      desciption: "clear sky",
      iconId: "01d",
      humidity: "50 %",
      percievedTemp: "20 °C",
      pressure: "1012 hPa",
      temp: "22 °C",
      clouds: "0 %",
      country: "GB",
      visibility: "10000 m",
      windSpeed: "3.6 m/s",
      icon: services.weatherIconUrl + "01d@4x.png",
    });
  });

  it("should return weather details for valid latitude and longitude", async () => {
    const mockResponse = {
      data: {
        name: "Delhi",
        weather: [{ main: "Clouds", description: "cloudy", icon: "03d" }],
        main: { humidity: 60, feels_like: 18, pressure: 1015, temp: 20 },
        clouds: { all: 40 },
        sys: { country: "FR" },
        visibility: 8000,
        wind: { speed: 5.1 },
      },
    };

    weatherInstance.get.mockResolvedValue(mockResponse);

    const res = await request(app)
      .get("/api/weather")
      .query({ lat: 48.8566, lon: 2.3522 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: "Delhi",
      weather: "Clouds",
      desciption: "cloudy",
      iconId: "03d",
      humidity: "60 %",
      percievedTemp: "18 °C",
      pressure: "1015 hPa",
      temp: "20 °C",
      clouds: "40 %",
      country: "FR",
      visibility: "8000 m",
      windSpeed: "5.1 m/s",
      icon: services.weatherIconUrl + "03d@4x.png",
    });
  });

  it("should return 400 error if no query parameters are provided", async () => {
    const res = await request(app).get("/api/weather");

    expect(res.status).toBe(400);
    expect(res.statusCode).toBe(400);
    expect(res.badRequest).toEqual(true);
    expect(res.body).toEqual({});
  });
});
