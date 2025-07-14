import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
import path from "path";// to create absolute paths for images
// to convert the file URL to a path
import { fileURLToPath } from 'url';

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

//manipulating absolute paths to have acceess to images folder.
const __filename = fileURLToPath(import.meta.url);
console.log(`__filename: ${__filename}`);
const __dirname = path.dirname(__filename);// return directory (WebApp-02) absolute path.
console.log(`__dirname: ${__dirname}`);
const imagePath = path.join(__dirname, "images");
console.log(`imagePath: ${imagePath}`);// add images folder to the path _dirname.

app.use("/images", express.static(imagePath));

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`Todolist started on http://localhost:${listener.address().port}`);
});


