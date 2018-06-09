<?php
/*
	- sin parametros
*/


//obtener conexion a la base de datos (en la variable $db)
include("database.php");

//devolver la incidencia en formato json
$resultados = $db->query('select distinct prioridad from incidencia')->fetchAll(PDO::FETCH_ASSOC);
if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}



?>