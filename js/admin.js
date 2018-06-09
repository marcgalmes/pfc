pagina = 1;//0-> index; 1-> admin
var ayuntamientos = {};

function buscarUsuario(objFiltro,callback) {
	var filtro = "?";
	filtro += objFiltro.codigo?"codigo="+(objFiltro.codigo):"";
	$.getJSON('php/buscarUsuario.php'+filtro,function(usuarios) {
		if (callback) {
			var result = [];
			for (var usuario of usuarios) {
				var obj = new Usuario();
				obj.codigo = usuario.codigo;
				obj.nombre = usuario.nombre;
				obj.apellidos= usuario.apellidos;
				obj.telefono= usuario.telefono;
				obj.email = usuario.email;
				obj.password= usuario.password;
				obj.rolUsuario= usuario.rolUsuario;
				result.push(obj);
			}
			callback(result);
		}
	});
}

function buscarRolUsuario(objFiltro,callback) {
	var filtro = "?";
	$.getJSON('php/buscarRolUsuario.php'+filtro,function(roles) {
		if (callback) {
			var result = [];
			for (var rol of roles) {
				var obj = new Usuario();
				obj.codigo = rol.codigo;
				obj.nombre = rol.nombre;
				result.push(obj);
			}
			callback(result);
		}
	});
}


loadSection2 = loadSection;
loadSection = function(hash) {
	var match = hash.match(/seccion=(\w+)/);
	if (match){
		//oculta/muestra la seccion
		$(".main").hide();
		$(".seccion").show();
		$(".seccion").toggleClass("hide",true);
		$("#"+match[1]).toggleClass("hide",false);
		switch (match[1]) {
			case "inicio":
				match = hash.match(/error=(.+)/);
				if (match && match[1]) {
					mostrarError(decodeURIComponent(match[1]));
				}
				window.location = "#";
				break;
			case "mapaIncidencias":
				$("#mapaIncidencias .mapContainer").append($("#mapa"));
				break;
			case "modificarUsuario":
				match = hash.match(/usuario=(\d+)/);
				if (match && match[1]) {
					var usuario= match[1];
					$("#modificarUsuario h2").text("Usuario "+usuario);
					buscarUsuario({codigo:usuario},function(usuarios){
						
						var usuario = usuarios[0];
						$("#codigoUsuario").val(usuario.codigo);
						$("#rolUsuario").val(usuario.rolUsuario);
						$("#nombre2").val(usuario.nombre);
						$("#apellidos2").val(usuario.apellidos);
						$("#telefono2").val(usuario.telefono);
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
			default:
				loadSection2(hash);
		}
		closeMenu();//cerrar el menu
	} else {
			loadSection2(hash);
		}
	clearInfoWindow();
};

function actualizarAyuntamientos() {
	$.ajax(
{
	url: 'php/buscarAyuntamiento.php',
	data: {nombre:''},
	success: function(data) {
		data = JSON.parse(data);
		$e=$("#selectAyuntamiento");
		$e.html("");
		for (var ayt of data) {
			$e.append('<option value="'+ayt.codigo+'">'+ayt.nombre+"</option>");
			$e.attr("disabled",null);
			//$e.select2();
			ayuntamientos[ayt.codigo] =ayt;
		}
		var ayt = $e.val();
		seleccionarAyuntamiento(ayt);
		$e.on("change",function() {
			var ayt = $e.val();
			seleccionarAyuntamiento(ayt);
		});
	}
});
}
actualizarAyuntamientos();

function seleccionarAyuntamiento(ayt) {
	ayt = ayuntamientos[ayt];
	$(".codigo_ayuntamiento").text(ayt.codigo);
		$("#codigo_ayuntamiento").val(ayt.codigo);
		$("#nombre_ayuntamiento").val(ayt.nombre);
		$(".nombre_ayuntamiento").text(ayt.nombre);
		if (ayt.logo!=null)
		$(".logo_ayuntamiento").attr("src",ayt.logo.slice(1));
}

$.ajax(
{
	url: "php/buscarUsuario.php",
	data: {},
	success: function(data) {
		var usuarios = JSON.parse(data);
		for (var usuario of usuarios.sort(function(a,b) {
				var a = Date.parse(a.fecha);
				var b = Date.parse(b.fecha);
				return a-b;
				}
			).reverse()) {
				//usuarios recientes
				$("#usuariosRecientesList").append("<li class=\"list-item\">"+
						usuario.nombre +" "+ usuario.apellidos +" - "+usuario.email+ 
						" <a class=\"view-btn button\" href=\"#seccion=modificarUsuario#usuario="+
						usuario.codigo+"\">" + "Abrir perfil »</a></li>");
			}
	}
});

$(function(){
	buscarRolUsuario({},function(roles) {
		for (var rol of roles) {
			$("#rolUsuario").append("<option value="+'"'+rol.codigo+'">'+rol.nombre+"</option>");
		}
	});
	buscarTipoIncidencia({},function(tiposIncidencia) {
		tiposIncidencias = {};
		for (var tipoIncidencia of tiposIncidencia) {
			tiposIncidencias[tipoIncidencia.codigo] = tipoIncidencia;
			$("#categoriasList").append("<li class=\"list-item\">"+
						tipoIncidencia.nombre + 
						" <a class=\"view-btn button\" href=\"#seccion=modificarCategoria#categoria="+
						tipoIncidencia.codigo+"\">" + "Editar »</a></li>");
		}
	
	buscarIncidencia({},function(incidencias) {
		var porZonas = {};
		var porCategoria = {};
		var porEstado = {};
		var porPrioridad = {};
		for (var incidencia of incidencias) {
			var zona = incidencia.zona ||"Sin definir";
			var tipo = incidencia.tipoIncidencia||"Sin definir";
			var estado = incidencia.estado||"Sin definir";
			var prioridad = incidencia.prioridad||"Sin definir";
			tipo = tiposIncidencias[tipo].nombre;
			porZonas[zona] = porZonas[zona]?(porZonas[zona]+1):1;
			porCategoria[tipo] = porCategoria[tipo]?(porCategoria[tipo]+1):1;
			porEstado[estado] = porEstado[estado]?(porEstado[estado]+1):1;
			porPrioridad[prioridad] = porPrioridad[prioridad]?(porPrioridad[prioridad]+1):1;
		}
		var i = 0;
		var zonas = Object.keys(porZonas).sort(function(a,b){
			return porZonas[a]-porZonas[b];
		}).reverse();
		for (var zona of zonas) {
			i++;
			if (i==10) break;
			$("#incidencias_zona").append('<div class="propiedad">'+zona+'</div>');
			$("#incidencias_zona").append('<div class="valor">'+porZonas[zona]+'</div>');
		}
		i = 0;
		var tipos= Object.keys(porCategoria).sort(function(a,b){
			return porCategoria[a]-porCategoria[b];
		}).reverse();
		for (var tipo of tipos) {
			i++;
			if (i==10) break;
			$("#incidencias_tipo").append('<div class="propiedad">'+tipo+'</div>');
			$("#incidencias_tipo").append('<div class="valor">'+porCategoria[tipo]+'</div>');
		}
		i = 0;
		var estados= Object.keys(porEstado).sort(function(a,b){
			return porCategoria[a]-porCategoria[b];
		}).reverse();
		for (var estado of estados) {
			i++;
			if (i==10) break;
			$("#incidencias_estado").append('<div class="propiedad">'+estado+'</div>');
			$("#incidencias_estado").append('<div class="valor">'+porEstado[estado]+'</div>');
		}
		i = 0;
		var prioridades= Object.keys(porPrioridad);
		for (var prioridad of prioridades) {
			i++;
			if (i==10) break;
			$("#incidencias_prioridad").append('<div class="propiedad">'+prioridad+'</div>');
			$("#incidencias_prioridad").append('<div class="valor">'+porPrioridad[prioridad]+'</div>');
		}
	});
	});
});

registrar = function() {
	
}