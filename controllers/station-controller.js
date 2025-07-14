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
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    console.log(`adding report ${newReport.title}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  }

  

};




