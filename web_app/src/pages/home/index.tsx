import { ErrorToast } from "@/components/ErrorToast";
import CityInput from "@/features/CityInput";
import WeatherDisplay from "@/features/WeatherDisplay";
import { TWeatherData } from "@/hooks/useGetWeather";
import { en } from "@/utils/en";
import { useCallback, useState } from "react";

export default function Home() {
  const [data, setData] = useState<TWeatherData | null>(null);

  // function to set fetched weather data
  const handleWeatherData = useCallback((wData:TWeatherData) => {
    setData(wData);
  },[]);

  return (
    <div className={`my-16 flex justify-center`}>
      <main className="flex flex-col gap-10 justify-center lg:w-1/2 md:w-3/4 w-11/12">
        <CityInput handleData={handleWeatherData}/>
        <WeatherDisplay data={data}/>
      </main>
    </div>
  );
}
