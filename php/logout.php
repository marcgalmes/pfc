<?php
/*
*/

session_start();


if (!isset($_SESSION['user'])) {
	echo '{"status":"ERROR","error":"La sesión no existe"}';
	return;
}
$user = json_encode($_SESSION["user"]);
session_destroy();
echo '{"status":"OK","user":'.$user.'}';

?>