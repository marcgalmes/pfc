<?php
/*

 parametros: (POST)
	-codigo
	-nombre
	-apellidos
	-email
	-password
	-telefono
	-tipoDocumento
	-ayuntamiento
	-rolUsuario
	
*/

$codigo = 
$nombre = 
$apellidos = 
$telefono = 
$email = 
$password = 
$telefono = 
$tipoDocumento =
$ayuntamiento =
$rolUsuario = null;

if (isset($_POST["codigo"])) {
	$codigo = $_POST["codigo"];
}
if (isset($_POST["nombre"])) {
	$nombre = $_POST["nombre"];
}
if (isset($_POST["apellidos"])) {
	$apellidos = $_POST["apellidos"];
}
if (isset($_POST["email"])) {
	$email = $_POST["email"];
}
if (isset($_POST["password"])) {
	$password = $_POST["password"];
}
if (isset($_POST["telefono"])) {
	$telefono = $_POST["telefono"];
}
if (isset($_POST["rolUsuario"])) {
	$rolUsuario = $_POST["rolUsuario"];
}

if ($codigo=="") $codigo = null;
if ($nombre=="") $nombre=null;
if ($apellidos=="") $apellidos=null;
if ($email=="") $email=null;
if ($telefono=="") $telefono=null;
if ($password=="") $password=null;
if ($tipoDocumento=="") $tipoDocumento = null;
if ($ayuntamiento=="") $ayuntamiento = null;
if ($rolUsuario=="") $rolUsuario = null;

//encriptar la contraseña
$password = password_hash($password, PASSWORD_DEFAULT);

include("database.php");


$stat = $db->prepare('update usuario set rolUsuario=?,nombre=?,apellidos=?,telefono=? where codigo=?');

$resultados=$stat->execute(array($rolUsuario,$nombre,$apellidos,$telefono,$codigo));

if (!$resultados) {
	echo('{"error":"Error al guardar usuario en BD: '.var_export($stat->errorInfo()).'"}');
	return;
}
echo json_encode($resultados);


?>