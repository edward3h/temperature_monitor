import { Temperature } from "../models/index";
import kumoGetTemps from "./kumoApi";
import openWeatherGetTemps from "./openWeatherApi";
import { median } from "simple-statistics";

const SOURCES = [kumoGetTemps, openWeatherGetTemps];

const _patch = (v) => {
  v.modesetting = v.modeSetting;
  v.degreesf = v.temp;
  return v;
};

(async () => {
  const inserts = SOURCES.flatMap(async (f) => {
    const results = await f();
    return await Promise.all(
      results.flatMap(async (a) => {
        let value = await a;
        value = _patch(value);
        // console.log(value);
        return Temperature.create(value);
      })
    );
  });
  const insertResults = await Promise.all(inserts);
  const temps = await insertResults.flat();
  const medianInside = median(
    temps.filter((t) => !t.outside).map((t) => t.degreesf)
  );
  console.log(medianInside);
})();
