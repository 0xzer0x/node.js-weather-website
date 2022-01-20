const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for express config
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather app",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpmsg:
            "This is a simple application to get the weather forecast for your location and neatly display it",
        title: "Help",
    });
});

// weather api endpoint
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "address parameter missing",
        });
    } else {
        // call geocode with the query parameter address
        // get back the coordinates for address
        geocode(
            req.query.address,
            (geoError, { latitude, longitude, place } = {}) => {
                if (geoError) {
                    // If there's an error, send it back as json data
                    res.send({
                        error: geoError,
                    });
                } else {
                    // call the forecast api with the address coordinates
                    // get back current weather data
                    forecast(
                        latitude,
                        longitude,
                        (
                            forecastError,
                            { overview, currentTemp, feelslike } = {}
                        ) => {
                            if (forecastError) {
                                res.send({
                                    error: forecastError,
                                });
                            } else {
                                res.send({
                                    place,
                                    overview,
                                    currentTemp,
                                    feelslike,
                                });
                            }
                        }
                    );
                }
            }
        );
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Article not found",
        errorMsg: "The article you requested doesn't exist.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page not found",
        errorMsg: "The page you requested doesn't exist.",
    });
});

app.listen(3000, () => {
    console.log("[+] Server is up on port: 3000");
});
