import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { weatherTopController } from "./controllers/weatherTop-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { accountsController } from './controllers/accounts-controller.js';
import { userController } from './controllers/user-controller.js';

console.log("dashboardController import:", dashboardController);

export const router = express.Router();

// Accounts routes
router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);


//App routes
router.get("/dashboard", dashboardController.index);
router.get("/about", aboutController.index);
router.get("/weatherTop", weatherTopController.index);
router.post("/dashboard/addStation", dashboardController.addStation);
router.post("/station/:id/deleteStation", dashboardController.deleteStation);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addReport", stationController.addReport);
router.post("/station/:id/deleteReport/:reportId", stationController.deleteReport);


router.get("/user", userController.index);
router.post("/user/update", userController.updateUserInformation);



