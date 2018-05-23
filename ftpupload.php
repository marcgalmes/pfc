<?php
function uploadFile($ftp,$dest_file, $source_file=null){
	if ($source_file==null) $source_file = $dest_file;
	print(strlen(file_get_contents($source_file)));
	print("Uploading '".$source_file."' to '".$dest_file."'... \n");
$ret = ftp_nb_put($ftp, $dest_file, $source_file, FTP_BINARY, FTP_AUTORESUME);

while (FTP_MOREDATA == $ret)
    {
        // display progress bar, or someting
		echo ".";
        $ret = ftp_nb_continue($ftp);
    }

}

function uploadProject($ftp) {
ftp_mkdir($ftp,"css");
ftp_mkdir($ftp,"php");
ftp_mkdir($ftp,"js");
ftp_mkdir($ftp,"img");
uploadFile($ftp,"index.php");
uploadFile($ftp,"php/buscarIncidencia.php");
uploadFile($ftp,"php/buscarTipoIncidencia.php");
uploadFile($ftp,"php/guardarIncidencia.php");
uploadFile($ftp,"php/incidencia.php");
uploadFile($ftp,"php/registro.php");
uploadFile($ftp,"js/clases.js");
uploadFile($ftp,"js/fontawesome.js");
uploadFile($ftp,"js/google-maps.js");
uploadFile($ftp,"js/jquery.min.js");
uploadFile($ftp,"js/select2.min.js");
uploadFile($ftp,"img/foto1.jpg");
uploadFile($ftp,"img/info-i_maps.png");
uploadFile($ftp,"img/miUbicacion.png");
uploadFile($ftp,"css/buttons.css");
uploadFile($ftp,"css/estilos.css");
uploadFile($ftp,"css/select2.min.css");
ftp_close($ftp);

}


$port = 21;
$timeout = 60000;

//servidor 1
$host = "files.000webhost.com";
$user = "marcraftserver";
$pass = "marcraft";
echo "Connecting.......\n";
$ftp = ftp_connect($host,$port,$timeout);
ftp_login($ftp,$user,$pass);
ftp_chdir($ftp,"public_html_test");
echo "OK lets start ;)\n";
uploadProject($ftp);
echo "Finished!!\n";

//servidor 2

$host = "ftp.eshost.com.ar";
$user = "eshos_22121690";
$pass = "marcraft";

$ftp = ftp_connect($host,$port,$timeout);
ftp_login($ftp,$user,$pass);
ftp_chdir($ftp,"/htdocs/pfc");
echo "OK lets start ;)\n";
uploadProject($ftp);
echo "Finished!!\n";

// all done :-)

?>