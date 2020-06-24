require("dotenv").config();
import fetch from "node-fetch";

const WEATHER_QUERY = {
  appid: process.env.OPENWEATHER_ID,
  lat: process.env.LAT,
  lon: process.env.LON,
  exclude: "minutely,hourly,daily",
  units: "imperial",
};
const WEATHER_URL = (() => {
  const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
  const params = new URLSearchParams(WEATHER_QUERY);
  url.search = params.toString();
  return url;
})();

const fetchWeather = async () => {
  const res = await fetch(WEATHER_URL);
  if (res.ok) {
    return await res.json();
  }
  throw new Error(res.status);
};

const convertWeather = (weatherRes) => {
  return {
    kind: "thirdParty",
    source: "openweathermap.org",
    temp: Math.round(weatherRes?.current?.temp),
    outside: true,
  };
};

const getWeather = async () => {
  const result = await fetchWeather();
  return [convertWeather(result)];
};

export default getWeather;
