import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/Report-store.js";

export const stationController = {
  async index(request, response) {      
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "station",
      station: station,
    };  
    response.render("station-view", viewData);
    },

    async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: Number(request.body.windSpeed),
      windDirection: request.body.windDirection,
      pressure: Number(request.body.pressure),
    };
    console.log(`adding report ${newReport.title}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  }

  

};





