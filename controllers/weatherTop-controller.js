export const weatherTopController = {
  async index(request, response) {
    const viewData = {
      title: "Weather Top Application",
    };
    console.log("Weather Top rendering");
    response.render("weatherTop-view", viewData);
  },
};



