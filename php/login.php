<?php
/*

 parametros: (POST)
	-email
	-password
*/

$email = 
$password = null;
if (isset($_POST["email"])) {
	$email = $_POST["email"];
}
if (isset($_POST["password"])) {
	$password = $_POST["password"];
}

if ($email=="") $email=null;
if ($password=="") $password=null;

if ($email==null || $password==null) {
	echo('{"error":"Los parametros email y password son obligatorios"}');
	return;
}

//encriptar la contraseña
include("database.php");

//comprobar que el email no esta en uso
$stat = $db->query('select * from usuario where email=\''.$email.'\'');
$resultados = $stat->fetch(PDO::FETCH_ASSOC);
if ($resultados) {
	if (password_verify($password, $resultados['password'])) {
		echo '{"status":"OK","user":'.json_encode($resultados).'}';
	} else {
		echo '{"error":"Contraseña incorrecta."}';
	}
} else {
	echo '{"error":"Usuario no encontrado."}';
	
}


?>