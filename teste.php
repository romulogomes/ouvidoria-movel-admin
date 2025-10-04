<?php
	include('conexao.php');

    $usuario =   $_POST['usuario']; 
    $descricao = $mysqli->real_escape_string($_POST['descricao']);
    $data =      $mysqli->real_escape_string($_POST['data']);
    $endereco =  $mysqli->real_escape_string($_POST['endereco']);
    $localizacao =  $mysqli->real_escape_string($_POST['localizacao']);
    $img_url =  $mysqli->real_escape_string($_POST['img_url']);
    $categoria = $mysqli->real_escape_string($_POST['categoria']);

     if(!$usuario || !$categoria){
        echo "erro";
        return false;
    }

    $sql = "INSERT INTO `reclamacoes` (`id_reclamacao`, `descricao`, `data`, `endereco`, `localizacao`, `bairro`, `imagem_url`, `categoria_fk`, `usuario_fk`) 
                                           VALUES (NULL, '$descricao', '$data', '$endereco', '$localizacao', '', '$img_url', '$categoria', '$usuario');";
    
    $query = $mysqli->query($sql) or die($mysqli->error);

    mysqli_close($mysqli);
?>