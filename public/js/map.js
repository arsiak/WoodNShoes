var map;
var marker;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

google.maps.event.addDomListener(window, "load", initialize);

//AJAX with javascript
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

function searchAddress() {
  var addressInput = document.getElementById('address-input').value;

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: addressInput}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location; // reference LatLng value

      createMarker(myResult); // call the function that adds the marker

      map.setCenter(myResult);

      map.setZoom(17);

    }else {
      // warning message
    alert("The Geocode was not successful for the following reason: " + status);
    }
  });
}



function createMarker(latlng) {

   // If the user makes another search you must clear the marker variable
   if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker = '';
   }

   marker = new google.maps.Marker({
      map: map,
      position: latlng
   });

}