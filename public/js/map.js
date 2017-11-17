var map;
var marker;
var markers = [];

function initialize() {
	
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  if(document.getElementById("map-canvas")){
	  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	  searchAddress();
	}	
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
	
	if(document.getElementById('adress')){
	  var addressInput = document.getElementById('adress').innerHTML;
	  var geocoder = new google.maps.Geocoder();
	  
	  geocoder.geocode({address: addressInput}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		  var myResult = results[0].geometry.location; // reference LatLng value
		  createMarker(myResult); // call the function that adds the marker
		  map.setCenter(myResult);
		  map.setZoom(17);
		}
	  });
	} else {		
		var addresses = document.getElementById('addresses').getElementsByTagName('input');
		var geocoder = new google.maps.Geocoder();
		//var markers = [];
			for(var i = 0; i < addresses.length; i++){
				geocoder.geocode({address: addresses[i].value}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
					  var myResult = results[0].geometry.location; // reference LatLng value
					  createMarkers(myResult); // call the function that adds the marker
					  map.setCenter(myResult);
					  map.setZoom(4); 
					}
				  })
			}
			
	}
}

//function bite(chaine){
//	alert(chaine);
//}

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


function createMarkers(latlng) {

   marker = new google.maps.Marker({
      map: map,
      position: latlng
   });

}