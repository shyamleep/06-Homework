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
                console.log(data)
                var parsedDate = new Date((data.dt)*1000);
                var date = parsedDate.toDateString()
                var time = parsedDate.toLocaleTimeString()

                var icon = $("<img>")
                var src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
                $("#current-day").html(data.name + " " + data.sys.country + " " + date + " " + time);
                $("#current-day-data").append("Temp: " + data.main.temp + "&deg;F")
                
            });
            localStorage.setItem("city", JSON.stringify(city));
            $.ajax({

                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + 40.7 + "&lon=" + -74.0 + "&exclude=minutely,hourly,alerts&units=imperial&appid=12242d04509695b0bf9c4a41c4c13e11",
                method: "GET",
            }).then(function (data) {
                console.log(data)
                var daily = data.daily
                console.log(data.daily[0])
                daily.forEach()
            })
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
        var input = {name: data.name, coord: data.coord};
        console.log(input);
        localStorage.setItem('input', JSON.stringify(input));
    }
    
})