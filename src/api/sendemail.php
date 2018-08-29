<?php
	header('Content-type: application/json');
    $msg = "Olá Nati, meu nome é " . $_POST["Nome"] . ". " . wordwrap($_POST["Mensagem"],1000);
    $assunto = "Contato do Site";
    $headers = "From:" . $_POST["Email"] . "\r\n";
    $ok = mail("contato@fabbrica.website",$assunto, $msg, $headers);
    $response = array();
    $response['resp'] = $ok;
    echo json_encode($response);
?>