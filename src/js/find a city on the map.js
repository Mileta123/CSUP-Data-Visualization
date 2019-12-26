
var grad = $("#address").val();


function meteo(grad){
	
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather?q="+ grad +"&lang=fr&units=metric&appid=3c52f05dd1f0d3ad4faba99820954ae9",
		type: "GET",
		dataType: "json",

		success: function(data){
			
			 $("#tempMax").text("Temperature: "  + data.main.temp_max+"°");
			 $("#pressure").text("Pressure: "    + data.main.pressure+" Pa");
			 $("#windspeed").text("Wind speed: " + data.wind.speed+" Km/h");
			 $("#humidity").text("Humidity: "    + data.main.humidity+" %");
			 $("#temp").text(parseInt(                      data.main.temp)+"°");
			 $("#koordinate").text("Longitude = " + data.coord.lon+"Latitude = " + data.coord.lat )

			 $("#map").html("<iframe src='https://www.google.com/maps/embed/v1/place?key=AIzaSyBMtdsVDGb8x9NJku3jdI3eFfAL9tu22ao&q="
			 	+grad+
			 	"&zoom=12&maptype=roadmap' width='100%' height='100%' frameborder='0'></iframe>");  }   })
}


$(document).ready(function(){
	meteo(grad);


	$("#submit").click(function(){
		grad = $("#address").val();
		meteo(grad);
	})


	$("#address").keypress(function(e){
		if ( e.keyCode==13 ){

			grad = $("#address").val();
			meteo(grad);
		}
	});
})
