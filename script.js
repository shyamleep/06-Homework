var searchCity = $("#searchCity");
var searchButton = $("#searchButton");
var searchHistory = $("#searchHistory");
var currentWeather = $("#current-weather");
var forecast = $("#forecast");
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="

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
            })
            console.log(url)
        }
    })
};

getCurrentWeather();