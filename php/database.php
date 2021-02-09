<?php
//BBDD Local

$user = 'bedc20a6041c40';
$pass = '50bac903';
$db = new PDO('mysql:host=eu-cdbr-west-03.cleardb.net;port=3306;dbname=heroku_6f392082ba21b6e;',$user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

?>
