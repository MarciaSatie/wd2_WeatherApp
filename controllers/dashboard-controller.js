import { stationStore } from "../models/station-store.js";
import{accountsController} from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";
import {stationDetailStore} from "../models/station-detail-store.js";

export const dashboardController = {

  async index(request, response) {
  const loggedInUser = await accountsController.getLoggedInUser(request);
  const stationByID = await stationStore.getAllStaionsByUserId(loggedInUser._id);

  const sortedStations = stationByID.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  // Use a simple loop instead of map+await
  const stationsInfo = [];
  for (const station of sortedStations) {
    const maxTemp = await stationDetailStore.maxTemp(station._id);
    const minTemp = await stationDetailStore.minTemp(station._id);
    const maxWind = await stationDetailStore.maxWind(station._id);
    const minWind = await stationDetailStore.minWind(station._id);
    const maxPressure = await stationDetailStore.maxPressure(station._id);
    const minPressure = await stationDetailStore.minPressure(station._id);
    const weatherInfo = await stationDetailStore.getWeatherInfoByCode(station._id);
    const weatherDescription = weatherInfo.description;
    const weatherIcon = weatherInfo.icon;

    //latest report
    const latestReport = await stationDetailStore.getLatestReport(station._id);
    console.log(`Found ${latestReport} latest reports for station ${station._id}`);
    const latestTemperature =latestReport.temperature ;
    const latestWindSpeed = latestReport.windSpeed;
    const latestPressure = latestReport.pressure;


    stationsInfo.push({
      _id: station._id,
      title: station.title,
      latitude: station.latitude,
      longitude: station.longitude,
      maxTemperature: maxTemp,
      minTemperature: minTemp,
      maxWind: maxWind,
      minWind: minWind,
      maxPressure: maxPressure,
      minPressure: minPressure,
      weatherIcon: "https://openweathermap.org/img/wn/"+weatherIcon+".png",
      weatherDescription: weatherDescription,

      // Latest report data
      latestTemperature: latestTemperature,
      latestWindSpeed: latestWindSpeed,
      latestPressure: latestPressure,
      latestReport: latestReport,
    });
  }

 
  const viewData = {
    title: "Weather Dashboard",
    stations: stationsInfo,
    user: loggedInUser,
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


