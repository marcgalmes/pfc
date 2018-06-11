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
if ($codigo=="") $codigo=null;

if ($codigo==null) die("Error: codigo no especificado.");


include("database.php");

$sql = 'delete from incidencia where tipoIncidencia='.$codigo;
$stat = $db->prepare($sql);
$resultados=$stat->execute();
$sql = 'delete from tipoIncidencia where codigo='.$codigo;
$stat = $db->prepare($sql);
$resultados=$stat->execute();

if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo($sql);
}




?>