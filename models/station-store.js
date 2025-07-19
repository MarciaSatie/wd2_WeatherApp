import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("stations");
console.log("Station store initialized");

export const stationStore = {
  async getAllStations() {
    //console.log("Fetching all stations");
    await db.read();
    db.data.stations ||= []; // Ensure stations array is initialized
    ////console.log(`Found ${db.data.stations.length} stations`);
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    try {
      list.reports = await reportStore.getReportsByStationId(id);
      //console.log(`Found reports with id ${JSON.stringify(list.reports)}`);
    
    } catch (error) {
      //console.log(`Add Report to View Error: ${error}`);
    }
    return list;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};






