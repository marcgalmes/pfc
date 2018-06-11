<?php
session_start();
header("access-control-allow-origin: *");
if (!isset($_SESSION['user'])) {
	header("Location: ./#seccion=inicio#error=Sesi%C3%B3n%20no%20iniciada.");
	die();
} else if ($_SESSION['user']['rolUsuario']!="1") {
	header("Location: ./#seccion=inicio#error=No%20tienes%20autorizaci%C3%B3n%20para%20visitar%20este%20sitio.");
	die();
}
?>
<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Gestión de Ayuntamiento de Foobar</title>  
	

	<!-- jquery -->
	<!-- <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script> -->
	
	<!-- jquery offline -->
	<script src="js/jquery.min.js"></script>
	
	<!-- iconos ffa -->
	<!-- <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script> -->
	
	<!-- font aw offline -->
	<script src="js/fontawesome.js"></script>
	
	  <!-- select 2 -->
	  <!-- <link async href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" /> -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script> -->
	
	<!-- select 2 offline -->
	<link async href="css/select2.min.css" rel="stylesheet" />
	<script src="js/select2.min.js"></script>
	
	<link href="css/toastme.css" rel="stylesheet">
	<script src="js/toastme.js"></script>

	<link rel="stylesheet" href="css/estilos.css">
	<script src="js/clases.js"></script>
	<script src="js/js.js"></script>
	<script src="js/admin.js"></script>
      <link rel="stylesheet" href="css/buttons.css">
	  <link rel="stylesheet" href="css/admin.css">
	  
	  <!-- google maps -->
  <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC24GO81Fb-gw3SzEpSGxy_d3oV4r3jiew&callback=initMap"></script>
  <!-- google maps offline-->
  <!-- <script async src="js/google-maps.js?key=AIzaSyC24GO81Fb-gw3SzEpSGxy_d3oV4r3jiew&callback=initMap"></script> -->
</head>

<body>
	<div class="side_menu">
		<div class="burger_box">
			<div class="menu-icon-container">
				<a href="#" class="menu-icon js-menu_toggle closed">
					<span class="menu-icon_box">
						<span class="menu-icon_line menu-icon_line--1"></span>
						<span class="menu-icon_line menu-icon_line--2"></span>
						<span class="menu-icon_line menu-icon_line--3"></span>
					</span>
				</a>
			</div>
		</div>
		<div class="container">
			<h2 class="menu_title">Administración interna</h2>
			<img class="logo_ayuntamiento">
			<ul class="list_load menu-lateral">
				<li class="list_item"><a href="index.php" id="link-logout"> <i class="fas fa-sign-out-alt"></i> Volver al mapa de incidencias</a></li>
				<br>
				<li class="list_item"><a href="">Dashboard</a></li>
				<li class="list_item"><a href="#seccion=ayuntamiento">Gestionar ayuntamiento</a></li>
				<li class="list_item"><a href="#seccion=usuariosRecientes">Gestionar usuarios</a></li>
				<li class="list_item"><a href="#seccion=categorias">Gestionar categorias</a></li>
				<br>
				
			</ul>
			<div class="spacer_box"><p>Ayuntamiento de Foobar</p></div>
		</div>
	</div>
	<div id="mainpage" class="content">
	<div class="main">
	<div class="what_to_do titulo">Dashboard del sistema</div>
		<h4>Administración interna del ayuntamiento</h4>
		<div class="panel">
			<div class="titulo-panel">Ayuntamiento</div>
			<div class="propiedad">Nombre</div>
			<div class="valor nombre_ayuntamiento"> - </div>
			<img src="" class="logo logo_ayuntamiento">
			<a href="#seccion=ayuntamiento" style="font-size: 80%;">Cambiar ayuntamiento</a>
		</div>
		<div class="panel" id="incidencias_zona">
			<div class="titulo-panel">Incidencias por zona</div>
			<div class="propiedad"><b>Zona</b></div>
			<div class="valor"> <b>Num. incidencias </b></div>
		</div>
		<div class="panel" id="incidencias_tipo">
			<div class="titulo-panel">Incidencias por tipo</div>
			<div class="propiedad"><b>Tipo</b></div>
			<div class="valor"> <b>Num. incidencias </b></div>
		</div>
		<div class="panel" id="incidencias_prioridad">
			<div class="titulo-panel">Incidencias por prioridad</div>
			<div class="propiedad"><b>Prioridad</b></div>
			<div class="valor"> <b>Num. incidencias </b></div>
		</div>
		<div class="panel" id="incidencias_estado">
			<div class="titulo-panel">Incidencias por estado</div>
			<div class="propiedad"><b>Estado</b></div>
			<div class="valor"> <b>Num. incidencias </b></div>
		</div>
	</div>
<div  id="usuariosRecientes" class="seccion hide">
	<h5 class="what_to_do titulo">Administrar usuarios</h5>
	<h4>Listado de usuarios registrados recientemente</h4>
	<div class="listado">
		<ul class="list" style="list-style:none;" id="usuariosRecientesList">
		</ul>
	</div>
</div>
<div id="categorias" class="seccion hide">
	<h5 class="what_to_do titulo">Administrar categorias</h5>
	<h4>Listado de categorías de incidencias</h4>
	<div class="menu effect-13">
		<ul class="buttons">
			<li><a href="#seccion=modificarCategoria"> <i class="fas fa-plus"></i> <span>Nueva categoría</span></a></li>
		</ul>
	</div>
	<div class="listado">
		<ul class="list" style="list-style:none;" id="categoriasList">
		</ul>
	</div>
</div>
<div id="modificarCategoria" class="seccion hide with-close-btn">
	<div class="close"> <a href="#seccion=categorias"><i class="far fa-times-circle"></i></a></div>
		<h2>Editar categoría</h2>
		<form class="formulario" onsubmit="guardarCategoria();return false;">
			<input type="hidden" name="codigo" id="codigoCategoria">
			<label for="rolUsuario">Nombre de la categoría</label>
			<input type="text" placeholder="Nombre" name="nombre" id="nombreCategoria">
			<div class="content-check">
			<input type="submit" value="Guardar categoría">
			</div>
		</form>
</div>
<div id="borrarCategoria" class="seccion hide with-close-btn">
	<div class="close"> <a href="#seccion=categorias"><i class="far fa-times-circle"></i></a></div>
		<h2>Borrar categoría</h2>
		<form class="formulario" onsubmit="borrarCategoria();return false;">
			<p>Confirme que desea eliminar la categoria "<span class="nombreCategoria"></span>"</p>
			<div class="content-check">
			<input type="hidden" name="codigo" class="codigoCategoria">
			<input type="submit" value="Borrar categoría">
			<input type="button" onclick="location='#seccion=categorias'" value="Cancelar">
			</div>
		</form>
</div>
<div id="modificarUsuario" class="seccion hide with-close-btn">
	<div class="close"> <a href="#seccion=usuariosRecientes"><i class="far fa-times-circle"></i></a></div>
		<h2>Modificar usuario</h2>
		<form class="formulario" onsubmit="registrar();return false;">
			<input type="hidden" name="codigo" id="codigoUsuario">
			<label for="rolUsuario">Modificar rol</label>
			<select name="rolUsuario" id="rolUsuario"></select>
			<label for="nombre">Nombre y apellido(s) </label>
			<div class="nombreApellidos">
				<input type="text" id="nombre2" placeholder="Nombre" name="nombre"><input type="text" id="apellidos2" placeholder="Apellido(s)" name="apellidos">
			</div>
			<label for="telefono">Nº Teléfono</label>
			<input type="text" id="telefono2" placeholder="Nº Teléfono (opcional)" name="telefono">
			<div class="content-check">
			<input type="submit" value="Modificar perfil">
			</div>
		</form>
</div>
<div id="ayuntamiento" class="seccion hide">
	<div class="content-form">
		<h5 class="what_to_do titulo">Datos del ayuntamiento</h5>
		<h4>Modificar ayuntamiento</h4>
		<form class="formulario" method="POST" target="file_frame" action="php/guardarAyuntamiento.php" enctype="multipart/form-data">
			<label>Ayuntamiento: 
			<input type="hidden" id="codigo_ayuntamiento" name="codigo">
			<select id="selectAyuntamiento" disabled>
				<option>Cargando datos...</option>
			</select>
			</label>
			<label>Codigo: <span class="codigo_ayuntamiento"></span></label>
			<h5>Modificar datos</h5>
			<label for="nombre_ayuntamiento">Nombre</label>
			<input type="text" id="nombre_ayuntamiento" placeholder="Nombre" name="nombre">
			<label for="imagen_ayuntamiento">Imágen del ayuntamiento</label>
			<img src="" title="" class="logo_ayuntamiento">
			<input type="file" id="imagen_ayuntamiento" name="imagen" style="border:0;">
			<img class="logo">
			<iframe name="file_frame" style="display:none;" onload="actualizarAyuntamientos()" ></iframe>
			<div class="content-check">
				<input type="submit" value="Modificar datos">
			</div>
		</form>
	</div>
</div>
<div id="myToast" class="toast-popup"></div>
</div>

</body>
</html>
