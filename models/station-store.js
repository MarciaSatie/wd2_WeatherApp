import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {
  async getAllstations() {
    await db.read();
    return db.data.stations;
  },

  async addstation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getstationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    return list;
  },

  async deletestationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllstations() {
    db.data.stations = [];
    await db.write();
  },
};





