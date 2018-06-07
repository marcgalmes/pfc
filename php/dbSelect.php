<?php
/*

 parametros: (GET)
 
	-tabla
	-columnas
	-orderBy
	-groupBy
	-where

*/

$tabla = null;
$columnas = null;
$orderBy = null;
$groupBy = null;
$where = null;

if (isset($_GET['tabla'])) $tabla = $_GET['tabla'];
if (isset($_GET['columnas'])) $columnas = $_GET['columnas'];
if (isset($_GET['orderBy'])) $orderBy = $_GET['orderBy'];
if (isset($_GET['groupBy'])) $groupBy = $_GET['groupBy'];
if (isset($_GET['where'])) $where = $_GET['where'];

include("database.php");

if ($tabla==null) die("Parámetro no informado: tabla");
if ($columnas==null) $columnas = '*';
if ($orderBy==null) 
	$orderBy = "";
else {
	$orderBy = " order by ".$orderBy;
}
if ($groupBy==null) 
	$groupBy = "";
else {
	$groupBy = " group by ".$orderBy;
}
if ($where==null) {
	$where="";
} else {
	$where = " ".$where;
}
$stat = $db->query('select '.$columnas.' from '.$tabla.$where.$orderBy.$groupBy);
$resultados = $stat->fetchAll(PDO::FETCH_ASSOC);

if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}




?>