
// centralize all the services that the server uses
const services = {
    geocoding:'/geo/1.0/direct',
    openWeatherCurrent:'/data/2.5/weather',
    weatherIconUrl: process.env.WEATHER_ICON_URL,
};

export default services;