import fetch from "node-fetch";

// depends on the API server from https://github.com/sushilks/kumojs (technically it depends on my fork right now because of a minor bugfix)
const base = "http://localhost/heat/";
const request = async (url, method = "GET") => {
  const res = await fetch(base + url, { method });
  if (res.ok) {
    return await res.json();
  }
  throw new Error(res.status);
};

const c2f = (tempC) => Math.round((tempC * 9) / 5 + 32);

const convertStatus = (room, resStatus) => {
  const s = resStatus?.r?.indoorUnit?.status;
  if (s) {
    return {
      kind: "thermostat",
      source: room,
      temp: c2f(s.roomTemp),
      mode: s.mode,
      modeSetting:
        s.mode == "cool"
          ? c2f(s.spCool)
          : s.mode == "heat"
          ? c2f(s.spHeat)
          : null,
      outside: false,
    };
  }
  throw new Error("No status found in response");
};

const getRooms = () => request("v0/rooms");

const getRoomStatus = async (name) => {
  const status = await request(`v0/room/${name}/status`);
  return convertStatus(name, status);
};

const getTemps = async () => {
  const rooms = await getRooms();
  return Promise.all(rooms.map(async (v) => getRoomStatus(await v)));
};

export default getTemps;
