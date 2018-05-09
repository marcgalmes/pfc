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

var incidenciasCargadas = [];
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
				$("#tipoIncidencia").select2();
				$("#modificarIncidencia .mapContainer").append($("#mapa"));
				//revisar si hay alguna incidencia en la url, en ese caso rellenar el formulario con sus datos
				match = hash.match(/incidencia=(\d+)/);
				if (match && match[1]) {
					var incidencia = match[1];
					$("#modificarIncidencia h2").text("Incidencia "+incidencia);
					buscarIncidencia({codigo:incidencia},function(incidencias){
						
						var incidencia = incidencias[0];
						$("#tituloIncidencia").val(incidencia.titulo);
						$("#codigoIncidencia").val(incidencia.codigo);
						if (incidencia.latitud!=null && incidencia.longitud!=null) {
							$("#latitud").val(incidencia.latitud);
							$("#longitud").val(incidencia.longitud);
							addMarkerToMap(parseFloat(incidencia.latitud),parseFloat(incidencia.longitud));
						}
						//setTimeout(function() {
							$("#tipoIncidencia").val(incidencia.tipoIncidencia);
							$("#tipoIncidencia").trigger("change");
						//},1);
						
					});
					$("#tituloIncidencia").focus();
				} else {
					$("#modificarIncidencia h2").text("Nueva incidencia");
					var lat = $("#latitud");
					var lng = $("#longitud");
					clearIncidenciaForm();
					$("#latitud").val(lat);
					$("#longitud").val(lng);
				}
				break;
		}
		closeMenu();//cerrar el menu
	}
	clearInfoWindow();
};

function submitIncidenciaForm() {
	var $form = $('#modificarIncidencia form.formulario');
	$.ajax({
		type: 'POST',
		url: $form.attr("action"),
		data: $form.serialize(),
		success: function(resp) {
			alert(resp);
			console.log(resp);
			
			buscarIncidencia({codigo:$("#codigoIncidencia").val()},function(incidencias) {
				if (incidencias.length==1) {
					//incidencia con datos actualizados
					var incidencia = incidencias[0];
					borrarIncidenciaMapa(getIncidenciaByCodigo(incidencia.codigo));
					insertarIncidenciaMapa(incidencia);
				} else {
					console.log("error",incidencias);
				}
			});
		},
		error: function(error) {
			alert("error: "+error);
			console.log("error",error);
		}
	});
	//$('#modificarIncidencia form.formulario').submit();
}
function clearIncidenciaForm() {
	//$('#modificarIncidencia form.formulario input,select,textarea').val('');
	$("#modificarIncidencia").find("input,select,textarea").val("");
}

/*
 Cierra el info window abierto del mapa
*/
function clearInfoWindow() {
	if (typeof infoWindow !="undefined") {
		//borramos cualquier info window que este abierto
		infoWindow.setMap(null);
	}
}

function getIncidenciaByCodigo(codigo) {
	for (var incidencia of incidenciasCargadas) {
		if (incidencia.codigo==codigo) return incidencia;
	}
}

function borrarIncidenciaMapa(incidencia) {
	if (incidencia.marker) {
		incidencia.marker.setMap(null);
	}
}

function insertarIncidenciaMapa(incidencia) {//funcion convertida de una funcion anónima, ya que se usa dentro de un bucle

	var iconUrl = location.origin+location.pathname+"img/info-i_maps.png";
	var marker = new google.maps.Marker({
	  position: {lat:parseFloat(incidencia.latitud),lng:parseFloat(incidencia.longitud)},
	  icon: {url:iconUrl},
	  title: incidencia.titulo,
	  map: map
	});
	
	marker.addListener("click",function(){
		clearInfoWindow();
		infoWindow = new google.maps.InfoWindow({map:map});
		infoWindow.setPosition(marker.getPosition());
		infoWindow.setContent("<b>"+incidencia.titulo+"</b>"+"<div class=\"menu effect-13\">"+
"<ul class=\"buttons\"> <li class=\"secundario\">"+"<a href=\"#seccion=modificarIncidencia#incidencia="+incidencia.codigo+"\"> Abrir incidencia »</a></li></ul></div>");
	});
	
	//guardamos la instancia del marker para poder modificarlo en caso de modificación de la incidencia
	incidencia.marker = marker;

}


/*

CARGAR RECURSOS BBDD
Obtener objetos de la base de datos.

*/

function buscarIncidencia(objFiltro,callback) {
	var filtro = "?";
	filtro += objFiltro.codigo?"codigo="+(objFiltro.codigo):"";
	$.getJSON('php/buscarIncidencia.php'+filtro,function(incidencias) {
		if (callback) {
			var result = [];
			for (var incidencia of incidencias) {
				var obj = new Incidencia();
				obj.codigo = incidencia.codigo;
				obj.titulo = incidencia.titulo;
				obj.tipoIncidencia = incidencia.tipoIncidencia;
				obj.prioridad = incidencia.prioridad;
				obj.estado = incidencia.estado;
				obj.codigoUsuario = incidencia.codigoUsuario;
				obj.fecha = incidencia.fecha;
				obj.fechaResolucion = incidencia.fechaResolucion;
				obj.latitud = incidencia.latitud;
				obj.longitud = incidencia.longitud;
				result.push(obj);
			}
			callback(result);
		}
	});
}
function buscarTipoIncidencia(objFiltro,callback) {
	var filtro = "?";
	$.getJSON('php/buscarTipoIncidencia.php'+filtro,function(tiposIncidencia) {
		if (callback) {
			var result = [];
			for (var tipoIncidencia of tiposIncidencia) {
				var obj = new TipoIncidencia();
				obj.codigo = tipoIncidencia.codigo;
				obj.nombre = tipoIncidencia.nombre;
				obj.etiquetas = tipoIncidencia.etiquetas;
				result.push(obj);
			}
			callback(result);
		}
	});
}


/**

GOOGLE MAPS
Para conectar el mapa a google maps

*/

/*
TODO: consultar nombre de calles

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
	
	
	
	map.setZoom(18);
	map.addListener('click', addLatLng);
	
	//cargar tipos de incidencia
	buscarTipoIncidencia({},function(listTipoIncidencia) {
		for (var tipoIncidencia of listTipoIncidencia) {
			$("#tipoIncidencia").append("<option value=\""+tipoIncidencia.codigo+"\">"+tipoIncidencia.nombre+"</option>");
		}
	});
	
	//cargar incidencias y mostrar en el mapa
	buscarIncidencia({},function(incidencias) {
		/*
			por ahora descargamos todas las incidencias y las situamos en el mapa (provisional!!), mas adelante se filtrara por ubicacion
		*/
		incidenciasCargadas = incidencias;
		for (var incidencia of incidencias) {
			insertarIncidenciaMapa(incidencia);	
		}
		for (var incidencia of incidencias.sort(function(a,b) {
				var a = Date.parse(a.fecha);
				var b = Date.parse(b.fecha);
				return a-b;
				}
			).reverse()) {
			//incidencias recientes (provisional!!)
				$("#incidenciasRecientesList").append("<li class=\"list-item\">"+incidencia.titulo+" <a class=\"view-btn button\" href=\"#seccion=modificarIncidencia#incidencia="+incidencia.codigo+"\">" +incidencia.fecha+"»</a></li>");
		}
	});
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
			icon: new google.maps.MarkerImage('img/miUbicacion.png'),
			// shadow: null,
			// zIndex: 999,
			position: pos,
			map: map
		});
		
		map.setCenter(pos);
		myloc.addListener('click', function() {
			map.setZoom(18);
			map.setCenter(myloc.getPosition());
		});
  }

  function addMarkerToMap(lat,lng) {
	  // Add a new marker at the new plotted point on the polyline.
	if (typeof marker != "undefined") {
		marker.setMap(null);//borrar el marker
	};
	marker = new google.maps.Marker({
	  position: {lat:lat,lng:lng},
	  title: 'Incidencia aqui',
	  map: map
	});
  }
  
function addLatLng(event) {
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
	addMarkerToMap(lat,lng);
	$("#latitud").val(lat);
	$("#longitud").val(lng);
	
	//intentar detectar el nombre de la localización
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyC24GO81Fb-gw3SzEpSGxy_d3oV4r3jiew",function(resp) {
		clearInfoWindow();
		var nombre = "Nombre de lugar desconocido...";
		var descr = "-";
		try {
			//para cualquier caso
			nombre = resp.results[0].formatted_address.slice(0,30);
			descr = nombre;
			//resultados
			var found = false;
			for (var result of resp.results) {
				if (resp.results.indexOf(result)>4) break;//nadie va a la 2a pag de resultados de google, aqui igual
				var components = result.address_components;
				for (var comp of components) {
					if (comp.types.indexOf("route")>-1) {
						nombre = comp.long_name.slice(0,30);
						found = true;
						break;
					}
				}
				if (found) break;
			}
		} catch(e) {
			console.log(e);
		}
		infoWindow = new google.maps.InfoWindow({map:map});
		infoWindow.setPosition(marker.getPosition());
		infoWindow.setContent("<h3>"+nombre+"</h3>"+"<p>"+descr+"</p>"+"<div class=\"menu effect-13\">"+
			"<ul class=\"buttons\">"+
					(location.hash.indexOf("seccion=modificarIncidencia")==-1?"<li class=\"secundario\"><a href=\"#seccion=modificarIncidencia\">"+" <i class=\"fas fa-check-circle\"></i> Notificar incidencia</a></li>":"")+
					"</ul>");
	});
}

function nuevaIncidencia() {
	window.location = "#seccion=modificarIncidencia";
}
