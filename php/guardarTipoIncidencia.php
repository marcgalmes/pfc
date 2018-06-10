<?php
/*

 parametros: (POST)
 
	-nombre
	-
	-
	-

*/

$codigo = null;
$nombre = null;

if (isset($_POST["codigo"])) {
	$codigo = $_POST["codigo"];
} else if (isset($_GET["codigo"])) {
	$codigo = $_GET["codigo"];
}

if (isset($_POST["nombre"])) {
	$nombre = $_POST["nombre"];
} else {
	die("error: nombre no especificado");
}
if ($codigo=="") $codigo=null;


include("database.php");
if ($codigo==null) {
$stat = $db->prepare('insert into tipoIncidencia (nombre) values (?)');
	$resultados=$stat->execute(array($nombre));
} else {

	$stat = $db->prepare('update tipoIncidencia set nombre=? where codigo=?');
	$resultados=$stat->execute(array($nombre,$codigo));

}
if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}




?>