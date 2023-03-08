let request = new XMLHttpRequest();
request.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sofia?unitGroup=metric&key=9DK2NJ2HW36DZVYKJGVM364WC&contentType=json");
request.send();
request.responseType = "json";

console.log(request);
