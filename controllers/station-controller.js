import { stationStore } from "../models/station-store.js";

export const stationController = {
  async index(request, response) {      
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "station",
      station: station,
    };  
    response.render("station-view", viewData);
    },
};




