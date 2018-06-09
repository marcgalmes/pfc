<?php
/*

 parametros: (POST)
 
	-codigo (GET o POST)
	-nombre

*/
session_start();
$codigo = 0;
if (isset($_SESSION["ayuntamiento"])) {
	$codigo = $_SESSION["ayuntamiento"];
}

//obtener conexion a la base de datos (en la variable $db)
include("database.php");

//string que almacenará opciones de busqueda
$params = '';

if (isset($codigo) && $codigo!=null) {
	$params.=" and codigo=".$codigo;
}
//devolver los datos en formato json
$resultados = $db->query('select * from ayuntamiento where 1=1'.$params)->fetchAll(PDO::FETCH_ASSOC);
if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}



?>