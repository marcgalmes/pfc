<?php
/*

 parametros: (POST)
 
	-codigo (GET o POST)
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
if (isset($_POST["nombre"])) {
	$nombre = $_POST["nombre"];
}

//obtener conexion a la base de datos (en la variable $db)
include("database.php");

//string que almacenará opciones de busqueda
$params = '';

if (isset($codigo) && $codigo!=null) {
	$params.=" and codigo=".$codigo;
}

//devolver la incidencia en formato json
$resultados = $db->query('select * from tipoIncidencia where 1=1'.$params)->fetchAll(PDO::FETCH_ASSOC);
if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}



?>