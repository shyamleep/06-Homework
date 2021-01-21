var searchCity = $("#searchCity");
var searchButton = $("#searchButton");
var searchHistory = $("#searchHistory");
var currentWeather = $("#current-weather");
var forecast = $("#forecast");
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let lat;
let lon;

function getWeather() {
    // clear any previous cities
    currentWeather.empty();
    forecast.empty();
    var city = searchCity.val()
    // console.log(city)
    if (city !== "") {
        $.ajax({
            url: queryURL + city + "&units=imperial&appid=e4c96f7efefd249832654c007f8c0ef1",
            method: "GET",
        }).then(function (data) {
            console.log(data);
            // get lat and lon 
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            // get city info from data
            var cityName = $("<h3>").text(data.city.name);
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
            var cityTemp = $("<p>").text("Temperature: " + data.list[0].main.temp + " degrees F");
            var cityHumidity = $("<p>").text("Humidity: " + data.list[0].main.humidity + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + data.list[0].wind.speed + "MPH");
            // console.log(cityName, weatherIcon, cityTemp, cityHumidity, windSpeed)
            currentWeather.append(cityName.append(weatherIcon), cityTemp, cityHumidity, windSpeed);

            // new call with lat and lon
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=12242d04509695b0bf9c4a41c4c13e11",
                method: "GET",
            }).then(function (results) {
                console.log(results)
                var uvIndex = $("<p>").text("UV Index: " + results.current.uvi).attr("id", "uv");
                currentWeather.append(uvIndex)
                // get forecast data from results
                var dailyForecast = results.daily
                // for loop through days 1-5
                for (var i = 1; i < 6; i++) {
                    // make card for each day
                    var forecastCard = $("<div>").attr("class", "card col-sm-4");
                    // get daily data from results
                    var forecastDate = $("<h5>").text(moment().add(i, 'days').format("L"));
                    var forecastIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + dailyForecast[i].weather[0].icon + "@2x.png");
                    var forecastTemp = $("<p>").text("Temp: " + dailyForecast[i].temp.day + "degrees F");
                    var forecastHumidity = $("<p>").text("Humidity: " + dailyForecast[i].humidity + "%")
                    forecast.append(forecastCard.append(forecastDate, forecastIcon, forecastTemp, forecastHumidity));
                }
            })
        })
        // get from and store to local storage
        historyArray = JSON.parse(localStorage.getItem("history"));
        if (historyArray === null) {
            historyArray = [];
        };
        historyArray.push(city);
        localStorage.setItem("history", JSON.stringify(historyArray));
    }
};

function renderHistory() {
    // clear any previous cities stored
    searchHistory.empty();
    historyArray = JSON.parse(localStorage.getItem("history"));
    if (historyArray === null) {
        return
    } else {
        // loop over stored data and create button for each
        for (var i = 0; i < historyArray.length; i++){
            var historyButton = $("<button>").text(historyArray[i]);
            searchHistory.append(historyButton);
        }
    }
}

function weatherFromHistory() {
    
}
$(document).ready(function () {
    $("#searchButton").on("click", function () {
        getWeather();
    })
});
