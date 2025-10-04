<?php

	header('Access-Control-Allow-Origin: *');

	echo 'comecou';
	$nome_img = urldecode($_FILES["file"]["name"]);
    $tamanho = strlen($nome_img);
    
    if(substr($nome_img, $tamanho-3) !== 'jpg' && substr($nome_img, $tamanho-3) !== 'peg' && substr($nome_img, $tamanho-3) !== 'png'){
        $nome_img = $nome_img.'.jpg';
    }
    
    //$new_image_name = urldecode($_FILES["file"]["name"]);
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$nome_img);
    echo 'terminou';
    return 'ok';
?>
    