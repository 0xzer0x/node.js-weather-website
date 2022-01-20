console.log("Client-side JavaScript!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("form input");
let forecastData = document.getElementById("weather-forecast");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    forecastData.innerText = "Loading...";
    fetch("/weather?address=" + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                if (
                    data.error === "address parameter missing" ||
                    data.error === "Couldn't find the location specified"
                ) {
                    forecastData.innerText =
                        "Please enter a valid location and try again.";
                } else {
                    forecastData.innerText = `Error: ${data.error}`;
                }
            } else {
                forecastData.innerHTML = `<strong>Location:</strong> <i>${data.place}</i>`;
                forecastData.innerHTML += "<br/>";
                forecastData.innerHTML += "<br/>";
                forecastData.innerHTML += `${data.overview}. The current temperature is ${data.currentTemp}&#176;C, it feels like ${data.feelslike}&#176;C`;
                forecastData.style.fontFamily = "Arial";
                forecastData.style.fontSize = "20px";
            }
        });
    });
});
