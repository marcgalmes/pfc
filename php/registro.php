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

if ($codigo=="") $codigo = null;
if ($nombre=="") $nombre=null;
if ($apellidos=="") $apellidos=null;
if ($email=="") $email=null;
if ($telefono=="") $telefono=null;
if ($password=="") $password=null;
if ($tipoDocumento=="") $tipoDocumento = null;
if ($ayuntamiento=="") $ayuntamiento = null;
if ($rolUsuario=="") $rolUsuario = null;


if ($nombre==null || $password==null || $email==null) {
	echo('{"error":"Los parametros nombre, email y password son obligatorios"}');
	return;
}

//encriptar la contraseña
$password = password_hash($password, PASSWORD_DEFAULT);

include("database.php");

//comprobar que el email no esta en uso
$stat = $db->query('select codigo from usuario where email=\''.$email.'\'');
$resultados = $stat->fetch(PDO::FETCH_ASSOC);
if ($resultados) {//si el email se encontro mostrar error
	echo '{"error":"El email seleccionado ya está registado."}';
	return;
}

if ($codigo!=null) {//si se especifica un código, modificar el usuario, entonces borrar primero el usuario y crearlo con los nuevos parámetros
	$stat = $db->prepare('delete from usuario where codigo=?');
	$resultados=$stat->execute(array($codigo));
	echo "borrar usuario ";
	var_dump($resultados);
	var_dump($stat->errorInfo());//error!!!
}
$stat = $db->prepare('insert into usuario (
	codigo,nombre,apellidos,email,telefono,
	password,tipoDocumento,ayuntamiento,rolUsuario) values (?,?,?,?,?,?,?,?,?);');
$resultados=$stat->execute(array($codigo,$nombre,$apellidos,$email,$telefono,$password,$tipoDocumento,$ayuntamiento,$rolUsuario));
if (!$resultados) {
	echo('{"error":"Error al insertar usuario en BD: '.var_export($stat->errorInfo()).'"}');
	return;
}
$stat = $db->query('select * from usuario where email=\''.$email.'\'');
$resultados = $stat->fetch(PDO::FETCH_ASSOC);
if ($resultados) {
	echo json_encode($resultados);
} else {
	echo('{"error":"Error al recuperar usuario creado: '.var_export($stat->errorInfo()).'"}');
}




?>