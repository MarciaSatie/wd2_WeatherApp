import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationDetailStore } from "../models/station-detail-store.js";

export const stationController = {
  async index(request, response) {      
    const station = await stationStore.getStationById(request.params.id);
    const maxTemperature = await stationDetailStore.maxTemp(station._id);
    const minTemperature = await stationDetailStore.minTemp(station._id);
    
    const viewData = {
      title: "station",
      station: station,
      maxTemperature: maxTemperature?.toFixed(1),
      minTemperature: minTemperature?.toFixed(1),
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
    console.log(`adding report ${newReport.title} to station ${station._id}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  }

  

};






