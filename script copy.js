$(document).ready(function () {

    //  call current weather data from API
    $(".btn").on("click", function () {
        var city = $("#city-name").val()
        // event.preventDefault();
        console.log(city);

        if (city !== '') {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e4c96f7efefd249832654c007f8c0ef1",
                method: "GET",
            }).then(function (data) {
                var lat = data.coord.lat
                var lon = data.coord.lon
                var coord = [lat, lon]
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=12242d04509695b0bf9c4a41c4c13e11",
                    method: "GET",
                }).then(function (data) {
                    $("#current-day").html(new Date((data.current.dt) * 1000));
                    var icon = $("<img>")
                    var src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                    console.log(data.current.weather[0].icon)
                    $("#current-day").append(icon)
                    var forecast = data.daily
                    console.log(data)
                    for (var i = 1; i < 6; i++)
                        new Date((forecast[i].dt) * 1000);


            })
            localStorage.setItem(city, JSON.stringify(coord))


        });

}
        else {
        alert("City name cannot be empty")
    }
    })

// history list
var cities = []
function cityHistory() {
    var historyButton = $("<button>")
    $("#city-list").empty();
    cities.forEach(historyButton.text(cities[i])
    )
    // to save to local storage
    console.log(data);
    var input = { name: data.name, coord: data.coord };
    console.log(input);
    localStorage.setItem('input', JSON.stringify(input));
}
    
})