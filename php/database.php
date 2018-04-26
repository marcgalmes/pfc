<?php
$user = 'root';
$pass = '';
$db = new PDO('mysql:host=127.0.0.1;port=3306;dbname=pfc;',$user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));


?>