
$(document).ready(function(){
    
    $("#reset").click(function(){
        location.reload();
    });
    
    $("#submit").click(function(){
       
        var city = $("#city").val();
         
        if (city != ""){
           
            $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}
                  &units=imperial&appid=8f236e524e673e139b0f6739b81a6eb4`,
            type: "get",
            dataType: "json",
            
            success:function(data){
                console.log(data);
                var widget = show(data);
                $("#show").html(widget);
            }
        });
        } else {
            $("#show").html("<h3 style='color:red'><i>City name empty<i></h3>")
        }
    });
});

function show(data){
    return (
        `<img style="background-color:skyblue" src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'/><br>
        <h4>Opis: ${data.weather[0].description}</h4>
        <h4> ________________________</h4>
        <h4>Temperatura: ${data.main.temp} &#8457</h4>
        <h4>Pritisak: ${data.main.pressure} hPa</h4>
        <h4>Oblacnost: ${data.main.humidity} %</h4>
        <h4>Brzina vjetra: ${data.wind.speed} mile/hr</h4>
        <h4>Pravac vjetra: ${data.wind.deg} &#176</h4>
        <h4 style="color:blue">[ ${data.name}, ${data.sys.country}]<h4>`
        );
    }
