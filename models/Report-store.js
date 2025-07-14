import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("Reports");

export const ReportStore = {
  async getAllReports() {
    await db.read();
    return db.data.Reports;
  },

  async addReport(stationId, Report) {
    await db.read();
    Report._id = v4();
    Report.stationid = stationId;
    db.data.Reports.push(Report);
    await db.write();
    return Report;
  },

  async getReportsBystationId(id) {
    await db.read();
    return db.data.Reports.filter((Report) => Report.stationid === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.Reports.find((Report) => Report._id === id);
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.Reports.findIndex((Report) => Report._id === id);
    db.data.Reports.splice(index, 1);
    await db.write();
  },

  async deleteAllReports() {
    db.data.Reports = [];
    await db.write();
  },

  async updateReport(Report, updatedReport) {
    Report.title = updatedReport.title;
    Report.artist = updatedReport.artist;
    Report.duration = updatedReport.duration;
    await db.write();
  },
};






