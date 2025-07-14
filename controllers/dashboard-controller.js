export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Template Application",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};

