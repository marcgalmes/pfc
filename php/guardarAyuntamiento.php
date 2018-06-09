<?php
/*

 parametros: (POST)
 
	-titulo
	-descripcion
	-latitud
	-longitud

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
$logo = null;
if (isset($_FILES["imagen"])) {
	$file = $_FILES["imagen"];
	$uploads_dir = '../upload';
	if (!file_exists($uploads_dir)) mkdir($uploads_dir);
	$errors = $_FILES["imagen"]["error"];
	if ($errors==0) {
		//$error = $errors[$key];
		if ($errors == UPLOAD_ERR_OK) {
			$tmp_name = $_FILES["imagen"]["tmp_name"];
			$name = basename($_FILES["imagen"]["name"]);
			$name = "logo_ay_".$codigo.".dat";
			$logo = "$uploads_dir/$name";
			move_uploaded_file($tmp_name, $logo);
		}
	}
}
if ($codigo=="") $codigo=null;


include("database.php");
if ($codigo==null) {
$stat = $db->prepare('insert into ayuntamiento (nombre,logo) values (?,?)');
	$resultados=$stat->execute(array($nombre,$logo));
} else {
	if ($logo!=null) {
		$stat = $db->prepare('update ayuntamiento set nombre=?,logo=? where codigo=?');
		$resultados=$stat->execute(array($nombre,$logo,$codigo));
	} else {
		$stat = $db->prepare('update ayuntamiento set nombre=? where codigo=?');
		$resultados=$stat->execute(array($nombre,$codigo));
		
	}
}
if ($resultados) {
	echo(json_encode($resultados));
} else {
	echo("[]");
}




?>