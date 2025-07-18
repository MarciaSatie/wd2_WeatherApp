import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { weatherTopController } from "./controllers/weatherTop-controller.js";
import { stationController } from "./controllers/station-controller.js";


export const router = express.Router();

router.get("/", dashboardController.index);
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);
router.get("/weatherTop", weatherTopController.index);
router.post("/dashboard/addStation", dashboardController.addStation);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addReport", stationController.addReport);

