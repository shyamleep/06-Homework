var searchCity = $("#searchCity");
var searchButton = $("#searchButton");
var searchHistory = $("#searchHistory");
var currentWeather = $("#current-weather");
var forecast = $("#forecast");
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let lat;
let lon; 


function getCurrentWeather() {
    $("#searchButton").on("click", function () {
        // clear any previous cities
        currentWeather.empty();
        forecast.empty();
        var city = searchCity.val()
        // console.log(city)
        if (city !== "") {
            $.ajax({
                url: queryURL + city + "&units=imperial&appid=e4c96f7efefd249832654c007f8c0ef1",
                method: "GET",   
            }).then(function(data) {
                console.log(data);
                // get lat and lon 
                lat = data.city.coord.lat;
                lon = data.city.coord.lon;
                // get city info from data
                var cityName = $("<h3>").text(data.city.name);
                var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
                var cityTemp = $("<p>").text("Temperature: " + data.list[0].main.temp + "&deg;F");
                var cityHumidity = $("<p>").text("Humidity: " + data.list[0].main.humidity + "%");
                var windSpeed = $("<p>").text("Wind Speed: " + data.list[0].wind.speed + "MPH");
                // console.log(cityName, weatherIcon, cityTemp, cityHumidity, windSpeed)
                currentWeather.append(cityName.append(weatherIcon), cityTemp, cityHumidity, windSpeed);
            })
            // console.log(url)
        }
    })
};

getCurrentWeather();