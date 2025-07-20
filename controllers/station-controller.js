import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationDetailStore } from "../models/station-detail-store.js";

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
    
    
    const viewData = {
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

  async deleteReport(request, response) {
    const reportId = request.params.reportId;
    const report = await reportStore.getReportById(reportId);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + report.stationId);
  },

  

};






