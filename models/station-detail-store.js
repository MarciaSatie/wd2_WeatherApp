import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("reports");
console.log("Station-Detail store initialized");

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
    }


}

