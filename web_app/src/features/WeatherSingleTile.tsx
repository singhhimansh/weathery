import Dropcard from "@/components/Dropcard";

type TWeatherSingleTile = {
  label: string;
  icon: React.ReactNode;
  value: string | number;
};

// WeatherSingleTile component to display single weather parameter
export default function WeatherSingleTile({
  label,
  icon,
  value,
}: TWeatherSingleTile) {
  return (
    <Dropcard className={"tile"}>
      <div className="flex justify-start gap-2">
        {icon}
        <h1>{label}</h1>
      </div>
      <h1 className="font-bold pl-1">{value}</h1>
    </Dropcard>
  );
}
