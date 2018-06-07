pagina = 1;//0-> index; 1-> admin
var ayuntamientos = {};

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
		ayt = ayuntamientos[ayt];
		$("#codigo_ayuntamiento").text(ayt.codigo);
		$("#nombre_ayuntamiento").val(ayt.nombre);
	}
});

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
						" <a class=\"view-btn button\" href=\"#seccion=#usuario="+
						usuario.codigo+"\">" + "Abrir perfil »</a></li>");
			}
	}
});