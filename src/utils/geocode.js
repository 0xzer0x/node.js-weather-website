const request = require("postman-request");

const geocode = (address, callback) => {
    // the url to access the geolocation api
    const urlGeo =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address.toLowerCase()) +
        ".json?access_token=pk.eyJ1IjoiMHh6ZXIweCIsImEiOiJja3lkMDE2ZHkwdWRiMm5uMHVtZHBkbnpsIn0.YutvdueFeFzuw6uZLgVU0w";

    // make the request to the website and receive json data back
    request({ url: urlGeo, json: true }, (error, { body } = {}) => {
        if (error) {
            const err = "unable to connect to location service";
            callback(err); // send an error as a first argument to the callback function
        } else if (body.features.length === 0) {
            const err = "Couldn't find the location specified";
            callback(err); // send an error as a first argument to the callback function
        } else {
            // send back undefined and an object of 3 attributes: lat, long and place
            // to be used in the callback function
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
