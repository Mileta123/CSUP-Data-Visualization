
    var map;
    var markers = [];
    var infoWin = [];

function initMap (){
    
    var podgorica = {
        lat: 42.4304,
        lng: 19.2594
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: podgorica,
    });
  
    addMarker(podgorica);
  
   
    function addMarker(location) {
        
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

