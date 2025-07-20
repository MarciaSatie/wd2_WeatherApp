import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("reports");
console.log("Station-Detail store initialized");
const weatherInfo = [
            {code:200, description:"thunderstorm with light rain",icon:"11d"},
            {code:201, description:"thunderstorm with rain",icon:"11d"},
            {code:202, description:"thunderstorm with heavy rain",icon:"11d"},
            {code:210, description:"light thunderstorm",icon:"11d"},
            {code:211, description:"thunderstorm",icon:"11d"},
            {code:212, description:"heavy thunderstorm",icon:"11d"},
            {code:221, description:"ragged thunderstorm",icon:"11d"},  
            {code:230, description:"thunderstorm with light drizzle",icon:"11d"},
            {code:231, description:"thunderstorm with drizzle",icon:"11d"},    
            {code:232, description:"thunderstorm with heavy drizzle",icon:"11d"},
            {code: 300, description: "light intensity drizzle", icon: "09d"},
            {code: 301, description: "drizzle", icon: "09d"},  
            {code: 302, description: "heavy intensity drizzle", icon: "09d"},
            {code: 310, description: "light intensity drizzle rain", icon: "09d"},
            {code: 311, description: "drizzle rain", icon: "09d"},
            {code: 312, description: "heavy intensity drizzle rain", icon: "09d"},
            {code: 313, description: "shower rain and drizzle", icon: "09d"},
            {code: 314, description: "heavy shower rain and drizzle", icon: "09d"},
            {code: 321, description: "shower drizzle", icon: "09d"},
            {code: 500, description: "light rain", icon: "10d"},       
            {code: 501, description: "moderate rain", icon: "10d"},
            {code: 502, description: "heavy intensity rain", icon: "10d"},
            {code: 503, description: "very heavy rain", icon: "10d"},
            {code: 504, description: "extreme rain", icon: "10d"},
            {code: 511, description: "freezing rain", icon: "13d"},
            {code: 520, description: "light intensity shower rain", icon: "09d"},
            {code: 521, description: "shower rain", icon: "09d"},
            {code: 522, description: "heavy intensity shower rain", icon: "09d"},
            {code: 531, description: "ragged shower rain", icon: "09d"},
            {code: 600, description: "light snow", icon: "13d"},       
            {code: 601, description: "snow", icon: "13d"},
            {code: 602, description: "heavy snow", icon: "13d"},   
            {code: 611, description: "sleet", icon: "13d"},
            {code: 612, description: "shower sleet", icon: "13d"},
            {code: 615, description: "light rain and snow", icon: "13d"},
            {code: 616, description: "rain and snow", icon: "13d"},
            {code: 620, description: "light shower snow", icon: "13d"},
            {code: 621, description: "shower snow", icon: "13d"},
            {code: 622, description: "heavy shower snow", icon: "13d"},
            {code: 701, description: "mist", icon: "50d"}, 
            {code: 711, description: "smoke", icon: "50d"},
            {code: 721, description: "haze", icon: "50d"}, 
            {code: 731, description: "sand/ dust whirls", icon: "50d"},
            {code: 741, description: "fog", icon: "50d"},  
            {code: 751, description: "sand", icon: "50d"},
            {code: 761, description: "dust", icon: "50d"},
            {code: 762, description: "volcanic ash", icon: "50d"},
            {code: 771, description: "squalls", icon: "50d"},
            {code: 781, description: "tornado", icon: "50d"},  
            {code: 800, description: "clear sky", icon: "01d"},
            {code: 801, description: "few clouds", icon: "02d"},
            {code: 802, description: "scattered clouds", icon: "03d"},
            {code: 803, description: "broken clouds", icon: "04d"},    
            {code: 804, description: "overcast clouds", icon: "04d"},
        ];

export const stationDetailStore = {
    async getAllReports() {
        await db.read();
        db.data.reports ||= []; // Ensure reports array is initialized
        console.log(`Found ${db.data.reports.length} reports`);
        return db.data.reports;
    },

    async maxTemp(stationId) {
        await db.read();
        db.data.reports ||= [];

        // Filter reports for the specific station
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);

        const temps = stationReports
            .map(report => parseFloat(report.temperature))
            .filter(temp => !isNaN(temp));

        const maxTemp = temps.length > 0 ? Math.max(...temps) : null;

        console.log(`Max temp for station ${stationId}: ${maxTemp}`);
        return maxTemp;
    },

    async minTemp(stationId) {
        await db.read();
        db.data.reports ||= [];

        // Filter reports for the specific station
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);

        const temps = stationReports
            .map(report => parseFloat(report.temperature))
            .filter(temp => !isNaN(temp));

        const minTemp = temps.length > 0 ? Math.min(...temps) : null;

        console.log(`Min temp for station ${stationId}: ${minTemp}`);
        return minTemp;
    },

    async maxWind(stationId) {
        await db.read();
        db.data.reports ||= [];

        // Filter reports for the specific station
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);

        const reportList = stationReports
            .map(report => parseFloat(report.windSpeed))
            .filter(reportList => !isNaN(reportList));

        const max = reportList.length > 0 ? Math.max(...reportList) : null;

        console.log(`Max Wind Direction for station ${stationId}: ${max}`);
        return max;
    },

    async minWind(stationId) {
        await db.read();
        db.data.reports ||= [];

        // Filter reports for the specific station
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);

        const reportList = stationReports
            .map(report => parseFloat(report.windSpeed))
            .filter(reportList => !isNaN(reportList));

        const min = reportList.length > 0 ? Math.min(...reportList) : null;

        console.log(`Min Wind Direction for station ${stationId}: ${min}`);
        return min;
    },
    async maxPressure(stationId) {
        await db.read();
        db.data.reports ||= [];

        // Filter reports for the specific station
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);

        const reportList = stationReports
            .map(report => parseFloat(report.pressure))
            .filter(reportList => !isNaN(reportList));

        const max = reportList.length > 0 ? Math.max(...reportList) : null;

        console.log(`Max Pressure for station ${stationId}: ${max}`);
        return max;
    },    
    async minPressure(stationId) {
        await db.read();
        db.data.reports ||= [];

        // Filter reports for the specific station
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);

        const reportList = stationReports
            .map(report => parseFloat(report.pressure))
            .filter(reportList => !isNaN(reportList));

        const min = reportList.length > 0 ? Math.min(...reportList) : null;

        console.log(`Min Pressure for station ${stationId}: ${min}`);
        return min;
    },

    async getWeatherInfoByCode(stationId) {
        const stationReports = db.data.reports.filter(report => report.stationId === stationId);
        let currentDate = new Date(0);
        let latestReport = null;

        stationReports.map(report => {
            const date1 = new Date(report.date);
            if (date1 > currentDate) {
                currentDate = date1;
                latestReport = report;
            }
        });

        const weather = weatherInfo.find(item => latestReport.code);
        if (weather) {
            //console.log(`Weather description: ${weather.description}, Icon: ${weather.icon}`);
            return weather;
        }
    },

    async getWeatherDescriptionByCode(code) {

        const weather = weatherInfo.find(item => item.code === code);
        if (weather) {
            //console.log(`Weather description: ${weather.description}, Icon: ${weather.icon}`);
            return weather.description;
        }
    }

}

