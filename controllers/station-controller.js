import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationDetailStore } from "../models/station-detail-store.js";
import axios from "axios";
import { json } from "express";




export const stationController = {

  async index(request, response) {   
    const station = await stationStore.getStationById(request.params.id);
    const reports = await reportStore.getReportsByStationId(station._id);
    const maxTemperature = await stationDetailStore.maxTemp(station._id);
    const minTemperature = await stationDetailStore.minTemp(station._id);
    const maxWind = await stationDetailStore.maxWind(station._id);
    const minWind = await stationDetailStore.minWind(station._id);
    const maxPressure = await stationDetailStore.maxPressure(station._id);
    const minPressure = await stationDetailStore.minPressure(station._id);
    const weatherInfo = await stationDetailStore.getWeatherInfoByCode(station._id);
    const weatherIcon = weatherInfo.icon;
    const weatherDescription = weatherInfo.description;
    // Get the latest report for the station
    const latestReport= await stationDetailStore.getLatestReport(station._id);
    const latestTemperature = latestReport ? latestReport.temperature : "N/A";
    const latestPressure = latestReport ? latestReport.pressure : "N/A";
    const latestWindSpeed = latestReport ? latestReport.windSpeed : "N/A";
    const latestWindDirection = latestReport ? latestReport.windDirection : "N/A";

    // Get infor from API
    const myKey = "28d113c14bdcc9cd848fb2587c6c503b";
    const cityName = station.title||"Unknown City";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}&units=metric`;
    console.log(`Fetching weather data for ${cityName} from OpenWeatherMap API: ${url}`);

    const result = await axios.get(url);
    let cityLongitude = result.data.coord.lon;
    let cityLatitude = result.data.coord.lat;
    let reportAPI = {};
    if (result.status == 200) { //HTTP Status Codes that measn Success
      const currentWeather = result.data;
      reportAPI.code = currentWeather.weather[0].id;
      reportAPI.temperature = currentWeather.main.temp;
      reportAPI.windSpeed = currentWeather.wind.speed;
      reportAPI.pressure = currentWeather.main.pressure;
      reportAPI.windDirection = currentWeather.wind.deg;
    }



    const viewData = {
      brandName: "Weather in "+ station.title,
      title: "station",
      station: station,
      reports: reports,
      maxTemperature: maxTemperature?.toFixed(1),
      minTemperature: minTemperature?.toFixed(1),
      maxWind: maxWind?.toFixed(1),
      minWind: minWind?.toFixed(1),
      maxPressure: maxPressure?.toFixed(1),
      minPressure: minPressure?.toFixed(1),
      weatherIcon: "https://openweathermap.org/img/wn/"+weatherIcon+".png",
      weatherDescription: weatherDescription,
      latestTemperature: latestTemperature,
      latestPressure: latestPressure,
      latestWindSpeed: latestWindSpeed,
      latestWindDirection: latestWindDirection,

      reportAPI: {
        code: reportAPI.code,
        temperature: reportAPI.temperature,
        windSpeed: reportAPI.windSpeed,
        pressure: reportAPI.pressure,
        windDirection: reportAPI.windDirection,
      },
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
  },

  
  async addreportAuto(request, response) {
    console.log("rendering new report");
    const myKey = "28d113c14bdcc9cd848fb2587c6c503b";
    const station = await stationStore.getStationById(request.params.id);
    const cityName = station.title||"Unknown City";
    const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}&units=metric`;
    console.log(`Fetching weather data for ${cityName} from OpenWeatherMap API: ${url}`);

    let report = {};
    const result = await axios.get(weatherRequestUrl);
    if (result.status == 200) {
      const currentWeather = result.data;
      report.code = currentWeather.weather[0].id;
      report.temperature = currentWeather.main.temp;
      report.windSpeed = currentWeather.wind.speed;
      report.pressure = currentWeather.main.pressure;
      report.windDirection = currentWeather.wind.deg;
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report,
    };
    response.render("dashboard-view", viewData);
  },


  async deleteReport(request, response) {
    const reportId = request.params.reportId;
    const report = await reportStore.getReportById(reportId);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + report.stationId);
  },

  

};






