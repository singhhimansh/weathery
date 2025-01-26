import apiRoutes from "@/apiRoutes";
import useFetch from "./useFetch";

export type TError = {
  message: string;
  status: string;
};

export type TWeatherData = {
  name: string;
  weather: string;
  desciption: string;
  iconId: string;
  humidity: string;
  percievedTemp: string;
  pressure: string;
  temp: string;
  clouds: string;
  country: string;
  visibility: string;
  windSpeed: string;
  icon: string;
};

export type TPayload = { city: string } | { lat: number; lon: number };


// hook to get weather data
export const useGetWeather = () => {
  const fetchData = useFetch<TPayload, TWeatherData, TError>({
    url: apiRoutes.weather,
  });
  return fetchData;
};
