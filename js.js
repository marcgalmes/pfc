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
	var match = hash.match(/seccion=(\w+)/);
	if (match){
		//oculta/muestra la seccion
		$(".seccion").toggleClass("hide",true);
		$("#"+match[1]).toggleClass("hide",false);
		switch (match[1]) {
			case "mapaIncidencias":
				$("#mapaIncidencias .mapContainer").append($("#mapa"));
				break;
			case "modificarIncidencia":
				$("#modificarIncidencia .mapContainer").append($("#mapa"));
				$("#tituloIncidencia").focus();
				$("#tipoIncidencia").select2();
				break;
		}
		closeMenu();//cerrar el menu
	}
};




/**

GOOGLE MAPS
Para conectar el mapa a google maps

*/

$(function(){//intenta ubicar al cargar la pagina
	getMyLocation();
});
var map;
  function initMap() {
	  
  $(function(){//cargar mapa al haber cargado la página
	 
	map = new google.maps.Map(document.getElementById('mapa'), {
	  center: {lat: 39.5687965, lng: 2.6673537},
	  zoom: 18
	});
	
	if (window.myLocation) {
		showMyLocation(window.myLocation);
	}
  });
  }
  
  function getMyLocation() {
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		  window.myLocation = position;
		  showMyLocation(window.myLocation);
	  }, function() {
		  console.log("Error location");
	  });
	} else {
		alert("Location not supported");
	}
  }
  
  function showMyLocation(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};
		var myloc = new google.maps.Marker({
			clickable: false,
			icon: new google.maps.MarkerImage('miUbicacion.png'),
			// shadow: null,
			// zIndex: 999,
			position: pos,
			map: map
		});
		
		myloc.addListener('click', function() {
			map.setZoom(18);
			map.setCenter(myloc.getPosition());
		});
		
		map.setCenter(pos);
		map.setZoom(18);
		map.addListener('click', addLatLng);
  }

function addLatLng(event) {
	// Add a new marker at the new plotted point on the polyline.
	if (typeof marker != "undefined") {
		marker.setMap(null);//borrar el marker
	};
	marker = new google.maps.Marker({
	  position: event.latLng,
	  title: 'Incidencia aqui',
	  map: map
	});
	
	$("#latitud").val(event.latLng.lat);
	$("#longitud").val(event.latLng.lng);
}

function nuevaIncidencia() {
	window.location = "#seccion=modificarIncidencia";
}
