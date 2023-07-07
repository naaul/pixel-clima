
var units = "metric";


async function atualizarClima(city) {
    
    var final_link = "https://api.openweathermap.org/data/2.5/weather?lang=pt_br"+ "&units=" + units + "&q=" + city + "&APPID=3a882899ef839d2b08dc9d4599e34f32"; 
    
    const response = await fetch(final_link);
    
    if (response.status == 404){
        $("#error").css({"display": "block"})
    } else {
        $("#card").css({"display": "flex"});
        $("form").css({"bottom": "5vh"});
        $("#error").css({"display": "none"})
        var data = await response.json();
        $("h2").text(data.name + ", " + data.sys.country);
        $("#temperatura").text(Math.round(data.main.temp) + "ºC");
        $("#vento-h5").text((Math.round(data.wind.speed * 3.6)) + " Km/H");
        $("#humidade-h5").text(data.main.humidity + " %");

        var current_weather = data.weather[0].main;
        var weather_img = "./assets/weather-icon/"

        switch (current_weather) {
            case "Clear":
                weather_img += "clear"
                $("img").attr("src", weather_img + ".png")
                break;
            case "Clouds":
                weather_img += "clouds"
                $("img").attr("src", weather_img + ".png")
                break;
            case "Drizzle":
                weather_img += "drizzle"
                $("img").attr("src", weather_img + ".png")
                break;
            case "Mist":
                weather_img += "mist"
                $("img").attr("src", weather_img + ".png")
                break;
            case "Rain":
                weather_img += "rain"
                $("img").attr("src", weather_img + ".png")
                break;
            case "Snow":
                weather_img += "snow"
                $("img").attr("src", weather_img + ".png")
                break;
              
        
            default:
                console.log("erro switch")
                break;
        }

    }

}



$("#card").css({"display": "none"});



var button = document.querySelector("#input-text");

$("button").on("click", ()=>{
    atualizarClima(button.value);
})

$(window).on("keypress", (event)=>{
    if (event.which == 13){
        event.preventDefault();
        atualizarClima(button.value);
    }
})



async function current_time(){
    var date = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo", timeStyle: "medium", hourCycle: "h23"});
    $("#time").text(date)
    var number = Number(date.slice(0,2));
    if (number > 17 || number < 6){
        $("body").css({"background-image": "url('./assets/skypixel2.gif')"})
        $("#time").css({"color": "#6e2eab"})
    } else {
        $("body").css({"background-image": "url('./assets/skypixel1.gif')"})
        $("#time").css({"color": "red"})
    }
}

var intervalId = window.setInterval(function(){
    current_time();
  }, 1000);

