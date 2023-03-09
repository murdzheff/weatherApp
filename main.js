let address = document.getElementById("address");
let conditions = document.getElementById("conditions");
let temp = document.getElementById("temp");
let feelsLike = document.getElementById("feelsLike");
let windSpeed = document.getElementById("windSpeed");
let hum = document.getElementById("hum");
let bg = document.getElementById("background");
let grid = document.getElementById("forecastGrid");
let request = new XMLHttpRequest();
let api = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lesichovo?unitGroup=metric&key=9DK2NJ2HW36DZVYKJGVM364WC&contentType=json";
let input = document.getElementById("input");
let submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(api);
    api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value.toString()}?unitGroup=metric&key=9DK2NJ2HW36DZVYKJGVM364WC&contentType=json`;
    load();
})

window.addEventListener("load",load);

function load() {
    request.open("GET", api);
    request.send();
    request.responseType = "json";

    request.onload = () => {
        console.log(request.response)
        address.innerText = request.response.resolvedAddress;
        conditions.innerText = request.response.currentConditions.conditions;
        temp.innerText = `Temp: ${request.response.currentConditions.temp} °C`;
        feelsLike.innerText = `Feels like: ${request.response.currentConditions.feelslike} °C`;
        windSpeed.innerText = `Wind speed is: ${request.response.currentConditions.windspeed} km/h ||`;
        hum.innerText = `Humidity: ${request.response.currentConditions.humidity} %`
        grid.innerHTML = "";
        
        //tests for background

        // conditions.innerText = "neshto si";
        // conditions.innerText = "Rain, Overcast";
        //conditions.innerText = "Partially cloudy";

        if (conditions.innerText === "Partially cloudy") {
            bg.src = "./assets/weatherbg/clouds-16495.mp4";
        } else if (conditions.innerText === "Rain, Overcast") {
            bg.src = "./assets/weatherbg/rain.mp4";
        } else {
            bg.src = "./assets/weatherbg/sunny.mp4";
        }


        request.response.days.forEach(element => {
            let dayCard = document.createElement("div");
            dayCard.id = "dayCard";

            let date = document.createElement("h4");
            date.innerText = element.datetime

            let img = document.createElement("img");

            if (element.conditions === "Partially cloudy") {
                img.src = "./assets/images/cloudy.png";
            } else {
                img.src = "./assets/images/rain.png";
            }

            let tempContainer = document.createElement("span");
            let maxTemp = document.createElement("h5");
            let minTemp = document.createElement("h5");

            maxTemp.innerText = `Max: ${element.tempmax} °C`;
            minTemp.innerText = `Min: ${element.tempmin} °C`;

            tempContainer.append(maxTemp, minTemp);

            dayCard.append(date, img, tempContainer);

            grid.appendChild(dayCard);
        });
    }
}






