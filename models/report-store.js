import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import dayjs from 'dayjs';

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();

    const now = dayjs();
    const dateFormatted = now.format('dddd, MMMM D, YYYY h:mm');

    report._id = v4();
    report.date = dateFormatted;
    report.stationId = stationId;
    
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getReportsByStationId(id) {
    await db.read();
    db.data.reports ||= []; // Ensure reports array is initialized
    //console.log(`Found ${db.data.reports.length} reports for station ${id}`);
    return db.data.reports.filter((report) => report.stationId === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  async deleteReportsByStationId(stationId) {
    await db.read();
    db.data.reports ||= [];
    const before = db.data.reports.length;
    // Filter out all reports that do NOT belong to the given station
    db.data.reports = db.data.reports.filter(report => report.stationId !== stationId);
    const after = db.data.reports.length;

    console.log(`Deleted ${before - after} reports for station ${stationId}`);
    await db.write();
  },

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },



  async updateReport(report, updatedReport) {
    report.code = updatedReport.code;
    report.temperature = updatedReport.temperature;
    report.windSpeed = updatedReport.duration;
    report.windDirection = updatedReport.windDirection;
    report.pressure = updatedReport.pressure;
    await db.write();
  },
};






