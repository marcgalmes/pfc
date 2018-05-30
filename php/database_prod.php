<?php
//BBDD Produccion

$user = 'sql12240455';
$pass = 'wdDr1pMkdE';
$db = new PDO('mysql:host=sql12.freemysqlhosting.net;port=3306;dbname=sql12240455;',$user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

?>