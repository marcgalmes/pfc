<?php
$titulo = $_POST["titulo"];
$descripcion = $_POST["descripcion"];
$latitud = $_POST["latitud"];
$longitud = $_POST["longitud"];

echo date('Y-m-d H:i:s')."<br>";
echo $titulo."<br>".$descripcion."<br>".$latitud."<br>".$longitud."<br>";


?>