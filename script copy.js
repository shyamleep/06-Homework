$(document).ready(function () {


    //  call current weather data from API
    $(".btn").on("click", function () {
        
        var city = $("#city-name").val()
        // event.preventDefault();
        // console.log(city);

        if (city !== '') {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e4c96f7efefd249832654c007f8c0ef1",
                method: "GET",
            }).then(function (data) {
                console.log(data)
                var lat = data.coord.lat
                var lon = data.coord.lon
                var coord = [lat, lon]
                // var history = {city: city, coord: coord}
                
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=12242d04509695b0bf9c4a41c4c13e11",
                    method: "GET",
                }).then(function (data) {
                    console.log(data)
                    showCurrentWeather(data)
                    showForecast(data)
                });
                // history.push({city: city, coord: coord})
                localStorage.setItem(city, JSON.stringify(coord))

                // console.log(searchHistory)

           });

        }
        else {
            alert("City name cannot be empty")
        }
    });

// function showCurrentWeather() {
//     console.log(data.current.temp);
//     return "<h3>Temperature:" + data.current.temp + "&deg;F<h3>";
    
// }

    // history list
    // var cities = []
    // function cityHistory() {
    //     var historyButton = $("<button>")
    //     $("#city-list").empty();
    //     cities.forEach(historyButton.text(cities[i])
    //     )
    //     // to save to local storage
    //     console.log(data);
    //     var input = { name: data.name, coord: data.coord };
    //     console.log(input);
    //     localStorage.setItem('input', JSON.stringify(input));
    // }

    // $("#current-day").html(new Date((data.current.dt) * 1000));
    // $("#current-day-data").html("Temperature: " + data.current.temp + "&deg;F" + " Humidity: " + data.current.humidity + "%")
    // $("#current-icon").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")

    // var forecast = data.daily
    // console.log(data)
    // for (var i = 1; i < 6; i++)
    //     new Date((forecast[i].dt) * 1000);



});

function showCurrentWeather(data) {
    console.log(data.current.temp)
}

function showForecast(data) {
    console.log(data.daily[1].temp.min, data.daily[1].temp.max)
}