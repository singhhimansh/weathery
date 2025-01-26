import Input from "@/components/Input";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import Dropcard from "@/components/Dropcard";
import { en } from "@/utils/en";
import { TError, TWeatherData, useGetWeather } from "@/hooks/useGetWeather";
import { ErrorToast } from "@/components/ErrorToast";

// CityInput component to get city name input  and fetch weather data on button click
export default function CityInput({
  handleData,
}: {
  handleData: (data: TWeatherData) => void;
}) {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState<TError | null>(null);  // state to store error messages
  const [open, setOpen] = useState<boolean>(false);  // state to control error toast

  // handle city name input change
  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = (e.target.value).trim();
    if (/[^a-zA-Z]/.test(value)) {
      setError({ message: en.cityNameError } as TError);
    } else {
      setError(null);
    }
    setCityName(e.target.value);
  }, []);

  // handle get weather button click
  const handleClick = useCallback(() => {
    let city = cityName.trim();
    if (/[^a-zA-Z]/.test(city)) {
      setOpen(true);
      return;
    }
    if (city.length < 3) {
      setError({ message: en.citylengthError } as TError);
      setOpen(true);
      return;
    } else {
      setError(null);
    }
    refetch({ city });
  }, [cityName]);


  // hook call to fetch weather data
  const {
    data,
    loading,
    error: weatherErr,
    refetch,
  } = useGetWeather();

  // get user location and fetch weather data on page load using geolocation api
  useEffect(() => {
    if (window?.navigator?.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        let coord = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        refetch(coord);
      });
    }
  }, []);

  useEffect(() => {
    data && handleData(data as TWeatherData);
    if (weatherErr) {
      setOpen(true);
      setError(weatherErr);
    }
  }, [data, weatherErr]);


  return (
    <Dropcard className="p-4 text-center">
      <h2 className="text-xl font-bold mt-2 mb-5">{en.cityInputHeader}</h2>
      <div className="flex gap-2">
        <Input
          value={cityName}
          placeholder={en.cityPlaceholder}
          onChange={handleOnChange}
          onkeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />

        <ButtonWithIcon
          onClick={handleClick}
          isLoading={loading}
          //   disabled={cityName.length === 0}
          label={en.weatherButton}
        />
        {error && (
          <ErrorToast
            show={open}
            label={error?.status}
            error={error?.message as string}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </div>
    </Dropcard>
  );
}
