<?php
$codigo = $_POST["codigo"];
$codigo = $codigo or $_GET["codigo"];
$titulo = $_POST["titulo"];
$descripcion = $_POST["descripcion"];
$latitud = $_POST["latitud"];
$longitud = $_POST["longitud"];

include("database.php");
$params = '';
if (isset($codigo) && $codigo!=null) {
	$params.=" and codigo=".$codigo;
}
echo(json_encode($db->query('select * from incidencia where 1=1'.$params)->fetch(PDO::FETCH_ASSOC),0,1));



?>