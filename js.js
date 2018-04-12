// Requires jQuery
//Declaration of functions
var queryFn,queryMatches;
var openMenu = function(e){
    if (e) e.preventDefault(); $('.list_load, .list_item').stop();
    $(".js-menu_toggle").removeClass('closed').addClass('opened');

    $('.side_menu').css({ 'left':'0px' });

    var count = $('.list_item').length;
    $('.side_menu .list_load').slideDown( (count*.6)*100 );
    $('.side_menu .list_item').each(function(i){
        var thisLI = $(".side_menu .list_item");
        timeOut = 100*i;
        setTimeout(function(){
            thisLI.css({
                'opacity':'1',
                'margin-left':'0'
            });
        },100*i);
    });
};
var closeMenu = function(e){
	if (!queryMatches) return;
    if (e)e.preventDefault(); $('.list_load, .list_item').stop();
    $(".js-menu_toggle").removeClass('opened').addClass('closed');

    $('.side_menu').css({ 'left':'-250px' });

    var count = $('.side_menu .list_item').length;
    $('.side_menu .list_item').css({
        'opacity':'0',
        'margin-left':'-20px'
    });
    $('.side_menu .list_load').slideUp(300);
};
queryFn = function (query) {
	queryMatches = query.matches;
    if (query.matches) {
        closeMenu();
    } else {
        openMenu();
    }
};

var mediaQuery = window.matchMedia("(max-width:768px)");
mediaQuery.addListener(queryFn);
//document listeners
$(document).on('click','.js-menu_toggle.opened',closeMenu);
$(document).on('click','.js-menu_toggle.closed',openMenu);

//on load
$(function () {
	//auto mobile query
	queryFn(mediaQuery);
});
$(function(){
	loadSection(window.location.hash);
	$(window).on("hashchange",function(){
		var hash = window.location.hash;
		loadSection(hash);
	});
});

var loadSection = function(hash) {
	var match = hash.match(/seccion:(\w+)/);
	if (match){
		//oculta/muestra la seccion
		$(".seccion").toggleClass("hide",true);
		$("#"+match[1]).toggleClass("hide",false);
		closeMenu();//cerrar el menu
	}
};

/**

GOOGLE MAPS
Para conectar el mapa a google maps

*/


var map;
  function initMap() {
	 
	map = new google.maps.Map(document.getElementById('mapa'), {
	  center: {lat: 39.5687965, lng: 2.6673537},
	  zoom: 16
	});
	
	poly = new google.maps.Polyline({
	  strokeColor: '#000000',
	  strokeOpacity: 1.0,
	  strokeWeight: 3
	});
	poly.setMap(map);
	
  }
  
  function getMyLocation() {
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};
		var marker1 = new google.maps.Marker({
			position: pos,
			map: map,
			draggable: true,
			icon: image,
			animation: google.maps.Animation.DROP,
			title: 'Tu ubicación'   
		});
		
		marker1.addListener('click', function() {
			map.setZoom(18);
			map.setCenter(marker1.getPosition());
		});
		//info
		var infoWindow = new google.maps.InfoWindow({map: map});
		infoWindow.setPosition(pos);
		infoWindow.setContent('Location found.');
		
		map.setCenter(pos);
		map.addListener('click', addLatLng);
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
  }

function addLatLng(event) {
        var path = poly.getPath();

        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);

        // Add a new marker at the new plotted point on the polyline.
        var marker = new google.maps.Marker({
          position: event.latLng,
          title: '#' + path.getLength(),
          map: map
        });
      }
