// Requires jQuery
//Declaration of functions
var queryFn,queryMatches;
var menuOpen = false;
var openMenu = function(e){
	$("#mainpage *").css("pointer-events","none");
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
	menuOpen = true;
};
var closeMenu = function(e){
	$("#mainpage *").css("pointer-events","all");
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
	menuOpen = false;
};
queryFn = function (query) {
	queryMatches = query.matches;
    if (query.matches) {//movil
        closeMenu();
		$(".mobile-only").show();
    } else {//escritorio
		$(".mobile-only").hide();
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
	//automatic login
	$.ajax({url:"php/login.php",success:function(data) {
		data = JSON.parse(data);
		if (data.status=="OK") {
			loginCallback(data);
		} else {
			console.log(data);
		}
	}})
});

var incidenciasCargadas = [];
$(function(){
	loadSection(window.location.hash);
	$(window).on("hashchange",function(){
		var hash = window.location.hash;
		loadSection(hash);
	});
	$("#mainpage").on("click",function(ev) {
		if (menuOpen) {
			closeMenu();
		}
	});
});

var loadSection = function(hash) {
	var match = hash.match(/seccion=(\w+)/);
	if (match){
		//oculta/muestra la seccion
		$(".main").hide();
		$(".seccion").show();
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
						$("#descripcionIncidencia").val(incidencia.descripcion);
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
					var lat = $("#latitud").val();
					var lng = $("#longitud").val();
					clearIncidenciaForm();
					$("#latitud").val(lat);
					$("#longitud").val(lng);
				}
				break;
		}
		closeMenu();//cerrar el menu
	} else {
			$(".seccion").hide();
			$(".main").show();
		}
	clearInfoWindow();
};

function submitIncidenciaForm() {
	var $form = $('#modificarIncidencia form.formulario');
	for (var campo of ["tituloIncidencia","tipoIncidencia"]) {
		if ($("#"+campo).val()=="") {
			mostrarError("El campo "+campo+" es obligatorio.");
			$("#"+campo).focus();
			return;
		}
	}
	if ($("#latitud").val()=="") {
		mostrarError("Seleccione una ubicación para la incidencia en el mapa.");
		return;
	}
	$.ajax({
		type: 'POST',
		url: $form.attr("action"),
		data: $form.serialize(),
		success: function(resp) {
			//alert(resp);
			if (resp==true) {
				mostrarInfo("La incidencia ha sido creada. Gracias por su colaboración.");
			}
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

//tooltips
function mostrarTooltips() {
  function getOffset(elem) {
	var offsetLeft = 0, offsetTop = 0;
	do {
	  if ( !isNaN( elem.offsetLeft ) )
	  {
		offsetLeft += elem.offsetLeft;
		offsetTop += elem.offsetTop;
	  }
	} while( elem = elem.offsetParent );
	return {left: offsetLeft, top: offsetTop};
  }

  var targets = document.querySelectorAll( '[rel=tooltip]' ),
  target  = false,
  tooltip = false,
  title   = false,
  tip     = false;
  console.log( targets);

  for(var i = 0; i < targets.length; i++) {
	//targets[i].addEventListener("mouseenter", function() {
	  target  = targets[i];
	  (function(target,i) {
		setTimeout(function(){
	  //target  = this;
	  tip     = target.getAttribute("title");
	  tooltip = document.createElement("div");
	  tooltip.id = "tooltip";

	  if(!tip || tip == "")
	  return false;

	  target.removeAttribute("title");
	  tooltip.style.opacity = 0;
	  tooltip.innerHTML = tip;
	  document.body.appendChild(tooltip);

	  var init_tooltip = function()
	  {
		console.log(getOffset(target));
		// set width of tooltip to half of window width
		if(window.innerWidth < tooltip.offsetWidth * 1.5)
		tooltip.style.maxWidth = window.innerWidth / 2;
		else
		tooltip.style.maxWidth = 340;

		var pos_left = getOffset(target).left + (target.offsetWidth / 2) - (tooltip.offsetWidth / 2),
		pos_top  = getOffset(target).top - tooltip.offsetHeight - 10;
		console.log("top is", pos_top);
		if( pos_left < 0 )
		{
		  pos_left = getOffset(target).left + target.offsetWidth / 2 - 20;
		  tooltip.classList.add("left");
		}
		else
		tooltip.classList.remove("left");

		if( pos_left + tooltip.offsetWidth > window.innerWidth )
		{
		  pos_left = getOffset(target).left - tooltip.offsetWidth + target.offsetWidth / 2 + 20;
		  tooltip.classList.add("right");
		}
		else
		tooltip.classList.remove("right");

		if( pos_top < 0 )
		{
		  var pos_top  = getOffset(target).top + target.offsetHeight + 15;
		  tooltip.classList.add("top");
		}
		else
		tooltip.classList.remove("top");
		// adding "px" is very important
		tooltip.style.left = pos_left + "px";
		tooltip.style.top = pos_top + "px";
		tooltip.style.opacity  = 1;
	  };

	  init_tooltip();
	  window.addEventListener("resize", init_tooltip);

	  var remove_tooltip = function() {
		tooltip.style.opacity  = 0;
		setTimeout(function() {
		document.querySelector("#tooltip") && document.body.removeChild(document.querySelector("#tooltip"));
		},500);
		target.setAttribute("title", tip );
	  };
	  
	  setTimeout(remove_tooltip,800);

	  //target.addEventListener("mouseleave", remove_tooltip );
	  //tooltip.addEventListener("click", remove_tooltip );
	  },1000*i+200)})(target,i);
//	});
  }

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
				obj.descripcion = incidencia.descripcion;
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
			$("#tiposIncidencias").append("<label><input type =\"checkbox\" value=\""+tipoIncidencia.codigo+"\">"+tipoIncidencia.nombre+"</label>");
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
		var barrio = null;
		var posiblesBarrios = {};
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
					if (comp.types.indexOf("route")>-1 && !found) {
						nombre = comp.long_name.slice(0,30);
						found = true;
						//break;
					}
					if (comp.types.indexOf("political")>-1 && !posiblesBarrios[3]) {
						posiblesBarrios[3] = comp.long_name;
					}
					if (comp.types.indexOf("neighborhood")>-1 && !barrio) {
						barrio = comp.long_name.slice(0,30);
					}
					if (comp.types.indexOf("sublocality")>-1 && !posiblesBarrios[2]) {
						posiblesBarrios[2] = comp.long_name;
					}
					if (comp.types.indexOf("sublocality_level_1")>-1 && !posiblesBarrios[1]) {
						posiblesBarrios[1] = comp.long_name;
					}
				}
				//if (found) break;
			}
			if (!barrio) {
				barrio = posiblesBarrios[1] || posiblesBarrios[2] ||posiblesBarrios[3] || "-";
			}
			$("#barrio").text(barrio);
			$("#localizacion").text(descr);
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


function login() {
	var datos;
	for (var campo of ["email","clave"]) {
		if ($("#"+campo).val()=="") {
			mostrarError("El campo "+campo+" es obligatorio.");
			$("#"+campo).focus();
			return;
		}
	}
	datos = $("#login .formulario").serialize();
	$.ajax({
		url:"php/login.php",
		"data":datos,
		"method": "POST",
		"success": function(data) {
			var data = JSON.parse(data);
			if (data["status"]=="OK") {
				loginCallback(data);
			} else {
				mostrarError("ERROR: "+data["error"]);
			}
		}
	});
}

function loginCallback(data) {
	var user = data.user;
	mostrarInfo('Bienvenido de nuevo, '+user.nombre + " " + user.apellidos);
	window.location = "#seccion=mapaIncidencias";
	//cambiar boton de login por boton de perfil
	$("#link-login").attr("href","#seccion=perfil");
	$("#text-login").toggleClass("noshow",true);
	$("#text-login-profile").toggleClass("noshow",false);
	$("#link-logout").toggleClass("noshow",false);
	$("#logout").show();
	//rellenar datos en el perfil
	$("#nombre2").val(user.nombre);
	$("#apellidos2").val(user.apellidos);
	$("#telefono2").val(user.telefono);
}

function registrar() {
	try {
	var datos, password1, password2,errores,aceptaTerminos;
	errores=[];
	datos = $("#registro .formulario").serialize();
	password1 = $("#claveReg").val();
	password2 = $("#clave2").val();
	aceptaTerminos = $("#aceptarTerminos").is(":checked");
	for (var campo of ["nombre","apellidos","emailReg"]) {
		if ($("#"+campo).val()=="") {
			errores.push("El campo "+campo.replace("Reg","")+" es obligatorio.");
			$("#"+campo).focus();
			break;
		}
	}
	if ($("#claveReg").val()=="") {
		errores.push("La contraseña no puede estar vacía.");
	} else if ($("#claveReg").val().length<8) {
		errores.push("La contraseña debe tener una longitud de 8 caracteres.");
	}
	if (password1!=password2) {
		errores.push("Las contraseñas no coinciden.");
	}
	if (!aceptaTerminos) {
		errores.push("Debes aceptar los términos para poder registrarte.");
	}
	if (errores.length!=0) {
		//mostrarInfo("Se han encontrado los siguientes errores: \n"+errores);
		mostrarError(errores[0])
	} else {
		$.ajax({
		url:"php/registro.php",
		"data":datos,
		"method": "POST",
		"success": function(data) {
			var data = JSON.parse(data);
			if (!data["error"]) {
				alert("Bienvenido "+data);
			} else {
				mostrarError("No se ha podido registrar el usuario: "+data["error"]);
			}
		}
	});
	}
	
	}catch(e){
		alert(e);
	}
}

function mostrarInfo(message,tipo) {
	tipo = tipo||"info";
	if (tipo!="info") {
		message = "   "+message+"   ";
	}
	$("#myToast").showToast({
				  message: message,
				  mode: tipo, // warning, error, success
				  duration: message.length*50+1000
				});
}

function mostrarError(message) {
	mostrarInfo(message,"error");
}

function logout() {
	$("#link-logout").toggleClass("noshow",true);
	$.ajax({url:"php/logout.php",success: function(data) {
		data = JSON.parse(data);		
		if (data["status"]=="OK") {
			$("#logout").hide();
			$("#link-login").attr("href","#seccion=login");
			$("#text-login").toggleClass("noshow",false);
			$("#text-login-profile").toggleClass("noshow",true);
			//desrellenar datos en el perfil
			$("#nombre2").val("");
			$("#apellidos2").val("");
			$("#telefono2").val("");
			mostrarInfo("Se ha cerrado la sesión.");
		} else {
			$("#link-logout").toggleClass("noshow",false);
			mostrarError("Error al cerrar sesión: "+data.error);
			console.log(data);
		}
	}
	});
}