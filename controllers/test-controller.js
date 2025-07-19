export const testController = {
  index(request, response) {
    const viewData = {
      title: "Test Application",
    };
    console.log("Test rendering");
    response.render("test-view", viewData);
  },
};







