<?php
/*

 parametros: (POST)
 
	-titulo
	-descripcion
	-latitud
	-longitud

*/

$codigo = null;
$tipoIncidencia = 1;
$titulo = null;
$descripcion = null;
$latitud = null;
$longitud = null;

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
if (isset($_POST["tipoIncidencia"])) {
	$tipoIncidencia = $_POST["tipoIncidencia"];
}
if (isset($_POST["latitud"])) {
	$latitud = $_POST["latitud"];
}
if (isset($_POST["longitud"])) {
	$longitud = $_POST["longitud"];
}

if ($codigo=="") $codigo=null;
if ($latitud=="") $latitud=null;
if ($longitud=="") $longitud=null;


include("database.php");

//primero borrar la incidencia si ya existe
$stat = $db->prepare('delete from incidencia where codigo=?');
$resultados=$stat->execute(array($codigo));

$stat = $db->prepare('insert into incidencia (
	codigo,titulo,descripcion,tipoIncidencia,prioridad,estado,
	codigoUsuario,fecha,fechaResolucion,latitud,longitud) values (?,?,?,?,?,?,?,?,?,?,?);');
	
	
$resultados=$stat->execute(array($codigo,$titulo,$descripcion,$tipoIncidencia,'Normal supongo','Como toca',1,date('Y-m-d H:i:s'),null,$latitud,$longitud));

if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}




?>