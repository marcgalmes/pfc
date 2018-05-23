<?php
//BBDD Local

$user = 'root';
$pass = '';
$db = new PDO('mysql:host=127.0.0.1;port=3306;dbname=pfc;',$user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));


//BBDD Servidor 1
// $user = 'eshos_22121690';
// $pass = 'marcraft';
// $db = new PDO('mysql:host=sql210.eshost.com.ar;port=3306;dbname=eshos_22121690_pfc;',$user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));


?>