<?php
header("access-control-allow-origin: *");
?>
<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Incidencias - Ayuntamiento de Foobar</title>  
	

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
	<script src="js/js.js"></script>
	<script src="js/clases.js"></script>
      <link rel="stylesheet" href="css/buttons.css">
	  
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
			<h2 class="menu_title">Menu</h2>
			<script>
				
			</script>
			<ul class="list_load menu-lateral">
				<li class="list_item"><a href="#seccion=mapaIncidencias">Mapa de incidencias</a></li>
				<li class="list_item"><a href="#seccion=incidenciasRecientes">Incidencias recientes</a></li>
				<br>
				<li class="list_item"><a href="#seccion=login" id="link-login"> <i class="fas fa-user-circle"></i> 
				<span id="text-login">Identifícate (@)</span>
				<span id="text-login-profile" class="noshow">Mi perfil</span>
				</a>
				</li>
				<li class="list_item" id="logout" style="display:none;"><a href="javascript:logout();" id="link-logout" class="noshow"> <i class="fas fa-sign-out-alt"></i> Cerrar sesión</li>
				
			</ul>
			<div class="spacer_box"><p>Ayuntamiento de Foobar</p></div>
		</div>
	</div>
	<div id="mainpage" class="content">
	<div class="main">
		<div class="imagenFondo"></div>
		<div class="texto">
		<b>Notificación de incidencias del Ayuntamiento de Palma</b>
		<br><br>
		<div class="menu effect-13" style="opacity: 0.8;background:#fff;">
			<ul class="buttons">
				<li><a href="#seccion=mapaIncidencias"> <i class="fas fa-check-circle"></i> <span>Comenzar</span></a></li>
			</ul>
		</div>
		</div>
	</div>
<div id="mapaIncidencias" class="seccion hide">
	
	<div class="what_to_do titulo">Mapa de incidencias</div>

	<div class="mapContainer">
	<div id="mapa"></div>
	</div>
	<div class="menu effect-13">
		<ul class="buttons">
			<li rel="tooltip" title="Mi ubicación"><a href="javascript:getMyLocation()"> <i class="fas fa-location-arrow"></i> <span>Mi ubicación</span></a></li>
			<li rel="tooltip" title="Nueva incidencia"><a href="javascript:nuevaIncidencia()"><i class="fas fa-thumbtack"></i> <span>Nueva incidencia</span></a></li>
			<!-- <li><a href="#"><i class="fas fa-pencil-alt"></i> Editando incidencia</a></li> -->
			<li rel="tooltip" title="Mostrar incidencias"><a href="#seccion=mostrarIncidencias"><i class="fas fa-search"></i><span>Mostrar incidencias</span></a></li>
			<li class="mobile-only"><a href="javascript:mostrarTooltips();"><i class="fas fa-question"></i></a></li>
		</ul>
	</div>
</div>
<div  id="incidenciasRecientes" class="seccion hide">
	<h5 class="what_to_do titulo">Incidencias recientes</h5>
	<div class="listado">
		<ul class="list" style="list-style:none;" id="incidenciasRecientesList">
		</ul>
	</div>
</div>
<div id="modificarIncidencia" class="seccion hide with-close-btn">
	<div class="close"> <a href="#seccion=mapaIncidencias"><i class="far fa-times-circle"></i></a></div>
		<h2>Nueva incidencia</h2>
		<form class="formulario" method="POST" action="php/guardarIncidencia.php" target="_blank">
			
				<label>Título de la incidencia</label>
				<input type="text" name="titulo" value="" placeholder="Título de la incidencia" id="tituloIncidencia">
			<label>Tipo de la incidencia</label>
				<select id="tipoIncidencia" name="tipoIncidencia">
				</select>
				<h5>Descripción de la incidencia</h5>
				<textarea name="descripcion" id="descripcionIncidencia" placeholder="Descripción de la incidencia"></textarea>
				<h5>Localización de la incidencia</h5>
				<div class="mapContainer">
				
				</div>
				<div style="font-size: 70%;">
				<p>Ubicación seleccionada: <span id="localizacion"></span></p>
				<p>Zona/barrio: <span id="barrio"></span></p>
				</div>
				<input type="text" placeholder="codigo" name="codigo" id="codigoIncidencia">
				<input type="text" placeholder="latitud" name="latitud" id="latitud">
				<input type="text" placeholder="longitud" name="longitud" id="longitud">
				<div class="menu effect-13">
					<ul class="buttons">
						<li><a href="javascript:submitIncidenciaForm();"> <i class="fas fa-check-circle"></i> <span>Enviar incidencia</span></a></li>
						<li class="secundario"><a href="javascript:clearIncidenciaForm();"><i class="fas fa-eraser"></i> <span>Borrar</span></a></li>
					</ul>
				</div>
		</form>

</div>
<div id="login" class="seccion hide">
	<div class="content-form">
		<h5 class="what_to_do titulo">Inicia Sesión</h5>
		<h4>¿Usuario nuevo? <a href="#seccion=registro">Regístrate</a></h4>
		<form class="formulario" onsubmit="login();return false;">
			<label for="email">Email</label>
			<input type="text" id="email" name="email">
			<label for="clave">Contraseña</label>
			<input type="password" id="clave" name="password">
			<div class="content-check">
			<label for="checkbox"><input type="checkbox" id="checkbox" accesskey="r">Recuérdame</label>
			<input type="submit" value="Inicia Sesión">
			<p style="font-size: 80%;">
				<a href="#seccion=recuperarContraseña" style="pointer-events: all;">¿Olvidaste tu contraseña?</a>
			</p>
			</div>
		</form>
	</div>
</div>
<div id="registro" class="seccion hide">
	<div class="content-form">
		<h5 class="what_to_do titulo">Regístrate</h5>
		<h4>¿Usuario reincidente? <a href="#seccion=login">Inicia sesión</a></h4>
		<form class="formulario" onsubmit="registrar();return false;">
			<label for="nombre">Nombre y apellido(s) *</label>
			<div class="nombreApellidos">
				<input type="text" id="nombre" placeholder="Nombre" name="nombre"><input type="text" id="apellidos" placeholder="Apellido(s)" name="apellidos">
			</div>
			<label for="email">Email *</label>
			<input type="text" id="emailReg" placeholder="Correo electrónico" name="email">
			<label for="telefono">Nº Teléfono</label>
			<input type="text" id="telefono" placeholder="Nº Teléfono (opcional)" name="telefono">
			<label for="clave">Contraseña *</label>
			<input type="password" id="claveReg" name="password">
			<label for="clave">Repite la contraseña *</label>
			<input type="password" id="clave2">
			<div class="content-check">
			<label for="aceptarTerminos"><input type="checkbox" id="aceptarTerminos"> Acepto los términos y la política de privacidad</label>
			<input type="submit" value="Regístrate">
			</div>
		</form>
	</div>
</div>
<div id="perfil" class="seccion hide">
	<div class="content-form">
		<h5 class="what_to_do titulo">Mi perfil</h5>
		<h4>Modificar mis datos</h4>
		<form class="formulario" onsubmit="registrar();return false;">
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
</div>
<div id="mostrarIncidencias" class="seccion hide with-close-btn">
	<div class="close"> <a href="#seccion=mapaIncidencias"><i class="far fa-times-circle"></i></a></div>
	<div class="content-form">
		<h4>Filtro de incidencias</h4>
		<form class="formulario" onsubmit="mostrarIncidencias();return false;">
			<b>Tipos de incidencias</b>
			<div id="tiposIncidencias">
			<!--<label><input type="checkbox" value="val"> Nombre Tipo</label>-->
			</div>
			<div class="content-check">
			</div>
		</form>
	</div>
</div>
<div id="myToast" class="toast-popup"></div>
</div>

</body>
</html>
