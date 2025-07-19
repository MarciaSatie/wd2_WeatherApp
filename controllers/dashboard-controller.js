import { stationStore } from "../models/station-store.js";
import{accountsController} from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Weather Dashboard",
      stations: await stationStore.getAllStaionsByUserId(loggedInUser._id),
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userId: loggedInUser._id,
      
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
    
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userId: loggedInUser?._id,// if loggedInUser is exists, use its _id, otherwise undefined.
    };
    console.log(`Adding station with title: ${newStation.title} | lat: ${newStation.latitude} | long: ${newStation.longitude}`);

    await stationStore.addStation(newStation);
    console.log("Station added successfully");

    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    await reportStore.deleteReportsByStationId(station._id);
    console.log(`Deleting reports for station with ID: ${station._id}`);
    console.log(`Deleting station with ID: ${request.params.id}`);
    await stationStore.deleteStationById(request.params.id);
    response.redirect("/dashboard");
  },
};


