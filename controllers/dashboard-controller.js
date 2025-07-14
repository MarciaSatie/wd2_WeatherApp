import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Weather Dashboard",
      stations: await stationStore.getAllStations(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
    };
    console.log(`Adding station with title: ${newStation.title}`);

    await stationStore.addStation(newStation);
    console.log("Station added successfully");

    response.redirect("/dashboard");
  },
};
