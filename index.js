const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/Routes.js");
const logger = require("morgan");
const config = require("./config");

//Use cors
app.use(cors());
app.options("*", cors());

//Use BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Serve website files
app.use("/public", express.static("src/views/public"));

//Set up ejs
app.engine("html", require("ejs").renderFile);
app.set("views", "src/views");
app.set("view engine", "ejs");

//Logger
app.use(logger("dev"));

//Enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//Route all requests
router(app);

//Start server
app.listen(config.PORT, function () {
    console.log(
        "Started server at: http://" + config.URL + ":" + config.PORT + "  \n\n"
    );
});