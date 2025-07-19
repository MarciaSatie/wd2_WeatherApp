import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Weather Dashboard",
      stations: await stationStore.getAllStations(),
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
    
  },

  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };
    console.log(`Adding station with title: ${newStation.title} | lat: ${newStation.latitude} | long: ${newStation.longitude}`);

    await stationStore.addStation(newStation);
    console.log("Station added successfully");

    response.redirect("/dashboard");
  },
};


