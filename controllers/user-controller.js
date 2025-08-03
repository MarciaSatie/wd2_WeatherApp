import{accountsController} from "./accounts-controller.js";
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { userStore } from "../models/user-store.js";

const db = initStore("users");

export const userController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const userId = loggedInUser ? loggedInUser._id : null;


    const viewData = {
      title: "User information",
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName, 
      email: loggedInUser.email,
    };
    console.log("User information for:", loggedInUser);
    response.render("user-view", viewData);
  },

  async updateUserInformation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const userId = loggedInUser ? loggedInUser._id : null;

    const updates = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };

    const newInfo = await userStore.updateUser(userId, updates);

    if (newInfo) {
      console.log("User information updated successfully:", newInfo);
      response.redirect("/user?updated=true");
    };
  }
};








