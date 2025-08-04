# Weather App2 🌦️


# 🌤️ Weather App- Stations Manager.

## 🔗 Live Demo
[Visit the app at Render](https://wd2-weatherapp.onrender.com)

## 📜 Description
A personalized weather tracking app where users can create and manage their own weather stations. View real-time weather data, recent reports, temperature trends, and visual location mapping for each station. Powered by OpenWeatherMap.

### 🧭 Functionality

🔐 User Registration & Authentication

Users can sign up with their name, email, and password.

Secure login system to authenticate returning users.

Sessions are maintained to keep users logged in across requests.

Users can log out securely to end their session.

📊 Personalized Dashboard
- View all weather stations created by the user.
- Create stations manually (by coordinates) or automatically (by city name).
- View max/min temperature, wind speed, and pressure for each station.
- See the latest report for each station.
- Interactive map showing the geolocation of all stations with Leaflet.js.
- Delete Station, once delete a station, all the reports linked to this station will be deleted together. 

📍 Station Management
- Users can add stations manually by entering latitude and longitude.
- Alternatively, add stations automatically by city name using OpenWeatherMap API.
- Users can delete stations at any time.

🌡️ Report Management
- Add manual weather reports for any station.
- Reports include:
  - Temperature
  - Wind speed
  - Wind Direction
  - Atmospheric pressure
  - Date
- Graph showing the temperature from all reports.
- Users can edit or delete their reports.

🗺️ Interactive Map
- Displays all user stations with markers using Leaflet.js.
- Auto-zoom adjusts map to fit all visible stations.
- Clicking on a marker shows the station name in a popup.

---

## 🚀 Technologies Used
- HTML, CSS (Bulma)
- JavaScript
- Node.js
- Express.js
- Handlebars (templating engine)
- Leaflet.js (for maps)
- Axios (for API calls)

---

## 🖼️ Assets
- Icons from [Flaticon](https://www.flaticon.com/)

---

## 🧪 How to Run the Project Locally

### 🛠️ Prerequisites
- Node.js (v14 or higher): [Download here](https://nodejs.org/en/download)



## 🧪 How to Run the Project Locally
Clone the repository:
git clone  (https://github.com/MarciaSatie/wd2_WeatherApp.git)
<br>
Prerequisites
Node.js (version 14 or higher) ​(https://nodejs.org/en/download)


## Quick install

### install NPM

```sh
npm install
```



### Local Host

```sh
http://localhost:4000.
```

## 📂 Folder Structure

```plaintext
WEBAPP-02/
├── controllers/            # Application logic for user, station, and weatherTop
│   ├── station-controller.js
│   ├── user-controller.js
│   └── weatherTop-controller.js
│
├── images/                 # Folder for storing images (currently empty or not expanded)
│
├── models/                 # Data storage and business logic
│   ├── object-store.js
│   ├── report-store.js
│   ├── reports.json
│   ├── station-detail-store.js
│   ├── station-store.js
│   ├── stations.json
│   ├── user-store.js
│   └── users.json
│
├── node_modules/           # Node.js dependencies (auto-generated)
│
├── utils/                  # Utility functions (not expanded in screenshot)
│
├── views/                  # Handlebars view templates
│   ├── layouts/
│   │   └── main.hbs        # Main layout template
│   │
│   ├── partials/           # Reusable partial templates
│   │   ├── add-report.hbs
│   │   ├── add-station.hbs
│   │   ├── brand.hbs
│   │   ├── dashboard-station-detail.hbs
│   │   ├── list-reports.hbs
│   │   ├── list-stations.hbs
│   │   ├── menu.hbs
│   │   └── station-detail.hbs
│   │
│   ├── about-view.hbs
│   ├── dashboard-view.hbs
│   ├── index.hbs
│   ├── login-view.hbs
│   ├── signup-view.hbs
│   ├── station-view.hbs
│   ├── user-view.hbs
│   ├── weatherTop-view.hbs
│   └── welcome-menu.hbs
│
├── .gitignore              # Git ignored files list
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Exact versions of installed dependencies
├── README.md               # Project documentation
├── routes.js               # Express route definitions
└── server.js               # Entry point for starting the app
```

## 🙌 Acknowledgments
**Add images** : To import images to the project<br>
reference: https://www.geeksforgeeks.org/web-tech/express-js-express-static-function/

**How to fix ReferenceError: __dirname** : When I was trying to import an image usinge the tutorial above, I was getting the error "ReferenceError:__dirnames". To fix that I follwoed the tutorial from GeeksforGeeks: <br>
reference:https://www.geeksforgeeks.org/node-js/how-to-fix-referenceerror-dirname-is-not-defined-in-es-module-scope-in-javascript/

**Chrome Debbuger** : at package.json was changed  "start: node server.js" to "start": "node --inspect server.js", allowing to use node in the brouser.
reference: https://www.youtube.com/shorts/8WN5LogHiUE

**Leaflet: Layer Groups**: used to visualize multiples locations marks:
reference: https://leafletjs.com/examples/layers-control/

**Leaflet: fitBounds**: used to fit the map all markers from the project (when initialezed). 
reference: https://stackoverflow.com/questions/27451152/fitbounds-of-markers-with-leaflet

## 🙋‍♂️ Author
Made with ❤️ by [Marcia Satie](https://github.com/MarciaSatie)






