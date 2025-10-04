<?php
	include('conexao.php');

    if(!isset($_POST['id_usuario']) || !isset($_POST['token'])){
        echo "erro";
        return false;
    }

    $id_usuario = $_POST['id_usuario'];
    $token = $_POST['token'];
    
    $sql = "UPDATE `usuarios` SET `token_cel` = '' WHERE `usuarios`.`id_usuario` <> '$id_usuario' and `token_cel` = '$token'";    
    $query = mysql_query($sql) or die(mysql_error());


    $sql = "UPDATE `usuarios` SET `token_cel` = '$token' WHERE `usuarios`.`id_usuario` = '$id_usuario'";
    $query = mysql_query($sql) or die(mysql_error());

    $sql = "SELECT * FROM `usuarios` WHERE `id_usuario` = '$id_usuario'";
    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
        $infos[$i] = array("id_usuario" => $row['id_usuario'], "nome" => $row['nome'], 
                            "email" => $row['email'], "telefone" => $row['telefone'],
                            "bairro" => $row['bairro'], "token_cel" => $row['token_cel']); 
        $i++;
    }

    echo json_encode($infos);    
?>