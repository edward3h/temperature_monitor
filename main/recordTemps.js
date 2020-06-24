import { Temperature } from "../models/index";
import kumoGetTemps from "./kumoApi";
import openWeatherGetTemps from "./openWeatherApi";

const SOURCES = [kumoGetTemps, openWeatherGetTemps];

const _patch = (v) => {
  v.modesetting = v.modeSetting;
  v.degreesf = v.temp;
  return v;
};

SOURCES.forEach(async (f) => {
  const results = await f();
  results.forEach(async (a) => {
    let value = await a;
    value = _patch(value);
    console.log(value);
    Temperature.create(value);
  });
});
