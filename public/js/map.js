var map;
var marker;
var markers = [];
var infoWindow ;

function initialize() {
	
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  if(document.getElementById("map-canvas")){
	  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	  searchAddress();
	
	if(document.getElementById('infos')){
	
		var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
		
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
				  lat: position.coords.latitude,
				  lng: position.coords.longitude
				};

				infoWindow.setPosition(pos);
				infoWindow.setContent("You're here!");
				map.setCenter(pos);
				map.setZoom(9);
			  }, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			  });
			} else {
			  // Browser doesn't support Geolocation
			  handleLocationError(false, infoWindow, map.getCenter());
			}
		}
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
		var addresses = document.getElementById('infos').getElementsByClassName('addresses');
		var names = document.getElementById('infos').getElementsByClassName('titles');
		var des = document.getElementById('infos').getElementsByClassName('descr');
		var img = document.getElementById('infos').getElementsByClassName('imgs');
		var lks = document.getElementById('infos').getElementsByClassName('links');
		var geocoder = new google.maps.Geocoder();
		infoWindow = new google.maps.InfoWindow();
		//var markers = [];
			for(var i = 0; i < addresses.length; i++){
				geocoder.geocode({address: addresses[i].value}, createMarkers(addresses[i].value, names[i].value, des[i].value, img[i].value, lks[i].value,));
			}			
	}
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


function createMarkers(addr, name, descr, img, lk) {
	
	 return function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: name,
            });
			
			var content='<h1>'+name+'</h1>' +	
						'<h2>'+addr+'</h2>' +
						'<img src="/uploads/'+img+'" title="'+name+'" />' +
						'<p>'+descr+'</p>' +
						'<p><a href="../ad/'+lk+'" title="'+name+'" target="_parent">Shoes page</a></p>';

			
            (function (marker, addr) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                });
            })(marker, addr);
        }
    };
}