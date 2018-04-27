<?php
/*

 parametros: (POST)
 
	-titulo
	-descripcion
	-latitud
	-longitud

*/
if (isset($_POST["codigo"])) {
	$codigo = $_POST["codigo"];
} else if (isset($_GET["codigo"])) {
	$codigo = $_GET["codigo"];
}
if (isset($_POST["titulo"])) {
	$titulo = $_POST["titulo"];
}
if (isset($_POST["descripcion"])) {
	$descripcion = $_POST["descripcion"];
}
if (isset($_POST["latitud"])) {
	$latitud = $_POST["latitud"];
}
if (isset($_POST["longitud"])) {
	$longitud = $_POST["longitud"];
}


include("database.php");

$stat = $db->prepare('insert into incidencia (
	codigo,titulo,tipoIncidencia,prioridad,estado,
	codigoUsuario,fecha,fechaResolucion,latitud,longitud) values (null,?,?,?,?,?,?,?,?,?);');
	
$resultados=$stat->execute(array($titulo,1,'Normal supongo','Como toca',1,date('Y-m-d H:i:s'),null,$latitud,$longitud));

if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("{}");
}




?>