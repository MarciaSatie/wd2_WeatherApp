import { stationStore } from "../models/station-store.js";
import{accountsController} from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";
import {stationDetailStore} from "../models/station-detail-store.js";
import axios from "axios";
import { json } from "express";


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
    if (!latestReport) {
      console.log(`No reports found for station ${station._id}`);
    }
    let latestTemperature = "N/A";
    let latestWindSpeed = "N/A";
    let latestPressure = "N/A";

    if (latestReport) {
      latestTemperature = latestReport.temperature ?? "N/A";
      latestWindSpeed = latestReport.windSpeed ?? "N/A";
      latestPressure = latestReport.pressure ?? "N/A";
    }


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

  //getting Map information
  const mapData = {
    mapStations: stationsInfo.map(station => ({
      title: station.title,
      latitude: station.latitude,
      longitude: station.longitude,
    })),
  };

  const mapScript = `
  <script>
    const mapStations = ${JSON.stringify(mapData.mapStations)};
    const map = L.map('map');// create a map, for now without coordinates (setView).

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each station
    const markers = mapStations.map(station => 
      L.marker([station.latitude, station.longitude]).bindPopup(station.title)
    );

    // Fit the map to the markers, and ading the markers to the map
    if (markers.length > 0) { 
      const featureGroup  = new L.featureGroup(markers).addTo(map);
      map.fitBounds(featureGroup .getBounds());
    }
  </script>
`;

 
  const viewData = {
    title: "Weather Dashboard",
    stations: stationsInfo,
    user: loggedInUser,
    userId: loggedInUser._id,
    mapScript: mapScript,
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

  async addStationAuto(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const myKey = "28d113c14bdcc9cd848fb2587c6c503b";
    const cityName = request.body.title||"Unknown City";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}&units=metric`;
    
    try{
      const result = await axios.get(url);
    
      let cityLatitude = result.data.coord.lat;
      let cityLongitude = result.data.coord.lon;

      const newStation = {
        title: request.body.title,
        latitude: cityLatitude,
        longitude: cityLongitude,
        userId: loggedInUser?._id,// if loggedInUser is exists, use its _id, otherwise undefined.
      };
      console.log(`Adding station with title: ${newStation.title} | lat: ${newStation.latitude} | long: ${newStation.longitude}`);

      await stationStore.addStation(newStation);
      console.log("Station added successfully");

      response.redirect("/dashboard");
   
    }catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("City not found:", cityName);
        response.redirect("/dashboard?cityNull=true");
      } else {
        console.error("Error fetching city data:", error.message);
        response.status(500).send("Error fetching city data.");
      }
    }
    
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


