import Dropcard from "@/components/Dropcard";
import WeatherSingleTile from "./WeatherSingleTile";
import { en } from "@/utils/en";
import { HumidityDroplet } from "../../public/svg/HumidityDroplet";
import { BlowingWind } from "../../public/svg/BlowingWind";
import { ThunderCloud } from "../../public/svg/ThunderCloud";
import { TemperatureScale } from "../../public/svg/TemperaturScale";
import { BrightSun } from "../../public/svg/BrightSun";
import { MoonNight } from "../../public/svg/MoonNight";
import { TWeatherData } from "@/hooks/useGetWeather";
import Image from "next/image";
import { twc } from "@/utils/common.utils";
import { Heavyrain } from "../../public/svg/Heavyrain";
import { Visibility } from "../../public/svg/Visibility";

// Main component to display all fetch weather parameters
export default function WeatherDisplay({
  data,
}: {
  data: TWeatherData | null;
}) {
  const {
    name,
    country,
    temp,
    humidity,
    windSpeed,
    percievedTemp,
    pressure,
    clouds,
    desciption,
    icon,
    visibility,
    weather,
  } = data || ({} as TWeatherData);

  const date = new Date().toDateString(); // get current date

  return (
    <Dropcard className={"p-5 border-2 flex gap-2 justify-between"}>
      <div className="flex flex-col w-1/3 gap-1 ">
        <h2 className="text-xl text-gray-700  font-bold capitalize">
          {name}
          {country ? ", " + country : null}
        </h2>
        <h3 className="text-xs font-black text-slate-500">
          {date.slice(0, 3) + "," + date.slice(3)}
        </h3>
        <div className="flex flex-row py-4 gap-1 -ml-2">
          {icon ? (
            <Image
              className="saturate-200"
              alt={weather}
              width={70}
              height={70}
              src={icon}
            />
          ) : (
            <BrightSun size="60px" />
          )}

          <div className="flex flex-col text-gray-700">
            <h1 className="text-[28px] font-extrabold text-nowrap ">{temp}</h1>
            <h4 className="text-xs font-black">{weather}</h4>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 w-2/3 gap-4 ">
        <div
          className={twc("tile grid-item gap col-span-1 gap-4 justify-between")}
        >
          <div className="flex gap-1">
            <Image
              className="saturate-200 pb-2 ml-[-3px]"
              alt={desciption}
              width={17}
              height={17}
              src={(icon || '')?.replace("@4x", "@2x")}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <h1 className="font-black capitalize mb-2 text-wrap">
              {desciption}
            </h1>
          </div>
          <div className=" mb-2">
            <div className="flex gap-2 mb">
              <Heavyrain size="13px" />
              <h1>{en.cloudiness}</h1>
            </div>
            <p className="font-bold pl-1">{clouds}</p>
          </div>
          <div>
            <div className="flex gap-2 mb">
              <Visibility size="13px" />
              <h1>{en.visibility}</h1>
            </div>
            <p className="font-bold pl-1">{visibility}</p>
          </div>
        </div>
        <div className="grid grid-item col-span-2 grid-cols-2 gap-4">
          <WeatherSingleTile
            label={en.feelslike}
            icon={<TemperatureScale />}
            value={percievedTemp}
          />
          <WeatherSingleTile
            label={en.humidity}
            icon={<HumidityDroplet />}
            value={humidity}
          />
          <WeatherSingleTile
            label={en.windSpeed}
            icon={<BlowingWind size="13px" />}
            value={windSpeed}
          />
          <WeatherSingleTile
            label={en.pressure}
            icon={<ThunderCloud size="13px" />}
            value={pressure}
          />
        </div>
      </div>
    </Dropcard>
  );
}
