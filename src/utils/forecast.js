const request = require("postman-request");

const forecast = (lat, long, callback) => {
    // url to access the weather api using coordinates
    const urlWeather =
        "http://api.weatherapi.com/v1/current.json?key=d10780316c0040c5a6c160654221201&q=" +
        lat +
        "," +
        long +
        "&aqi=no";

    // the request to the api returns json object with the forecast data
    request({ url: urlWeather, json: true }, (requestError, { body } = {}) => {
        // send the callback function an error message as a first argument in case of network/api error
        if (requestError) {
            callback("unable to reach weather services");
        } else if (body.error) {
            callback("Can't resolve the weather for the specified coordinates");
        } else {
            // if all goes well, send back an object with 3 attributes
            // of information about current weather
            callback(undefined, {
                overview: body.current.condition.text,
                icon: body.current.condition.icon,
                currentTemp: body.current.temp_c,
                feelslike: body.current.feelslike_c,
            });
        }
    });
};

module.exports = forecast;
