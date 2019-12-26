
function selectGrad(lokacija) {

    let latitude = lokacija.lat();
    let longitude = lokacija.lng();
    let lok = new google.maps.LatLng(latitude, longitude);

    google.maps.event.trigger(map, 'resize');

    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=912020b174885e073ae8108c6674f03b', true);
    request.send();


    request.onreadystatechange=function() { 

    if(this.readyState==4 && this.status==200){
        var jsondata = JSON.parse(request.responseText);  //JSON pretvoren u objekat   
        var temperatura =    (jsondata["main"].temp-273).toFixed(2); // temperatura u Celzijusima
        var vlaznostVazduha = jsondata["main"].humidity;  //vlaznost vazduha u procentima
        var oblacnost =       jsondata["clouds"].all;
        var pritisakVazduha = jsondata["main"].pressure;
        var brzinaVjetra =    jsondata["wind"].speed;

        //POP UP vremenskog stanja
    addInfoWin(lok,ucitajSadrzaj(temperatura,vlaznostVazduha,oblacnost,pritisakVazduha,brzinaVjetra));
    }
}
    


//Otvara novi infowindow sa vremenskim podacima za odabranu lokaciju

function addInfoWin(lokacija1,sadrzaj1){
    infowindow = new google.maps.InfoWindow({
        content:  sadrzaj1,
        position: lokacija1
    });
        infoWin.push(infowindow);
        infowindow.open(map);
    }
}







function ucitajSadrzaj(temperatura,vlaznostVazduha,oblacnost,pritisakVazduha,brzinaVjetra){
    var sadrzaj = 
        '<div class="popUp">'+
            
            '<div class="naslov">'+
                '<header><b><u>CURRENT FORECAST:</u></b></header>'+
            '</div>'+
            
            '<div class="temperatura">'+
                '<img id="slikaVrijeme" src="'+slikaVrijeme(oblacnost,vlaznostVazduha)+'">'+
                '<h1 id="temperatura">'+temperatura+'&#8451</h1>'+
            '</div>'+

            '</div>'+
            '<div class="ostaliPodaci">'+
            
            '<div class="ostatakVrijeme">'+
                '<h3 id="oblacnost"><u>Cloudiness:</u>   '+oblacnost+'%</h3>'+
            '</div>'+
            
            '<div class="ostatakVrijeme">'+
                '<h3 id="vlaznost"><u>Humidity:</u>   '+vlaznostVazduha+'%</h3>'+
            '</div>'+
            
            '<div class="ostatakVrijeme">'+
                '<h3 id="pritisak"><u>Pressure:</u>   '+pritisakVazduha+' hPa</h3>'+
            '</div>'+
            
            '<div class="ostatakVrijeme">'+
                '<h3 id="brzina_vjetra"><u>Wind speed:</u>  '+brzinaVjetra+'m\s</h3>'+
            '</div>'+

        '</div>';
        return sadrzaj;
}

function slikaVrijeme(kolicinaOblaka,vlaga){
    if(kolicinaOblaka < 25){
        icon = "../photos/sunce.png";
    }
    else if(kolicinaOblaka > 50 && vlaga>50)
    {
        icon = "../photos/kisa-oblak.png";
    }
    else if(kolicinaOblaka > 50 && vlaga<50){
        icon = "../photos/oblak.png"
    }
    else{
        icon ="../photos/sunce-oblak.png";
    }
        return icon;
}
    

