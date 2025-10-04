<?php
	include('conexao.php');

    if(!isset($_POST['nome']) || !isset($_POST['email']) || !isset($_POST['id_usuario'])){
        echo "erro";
        return false;
    }

    $id_usuario = $_POST['id_usuario'];
    $nome =  mysql_real_escape_string($_POST['nome']);
    $cpf = mysql_real_escape_string($_POST['cpf']);
    $email = mysql_real_escape_string($_POST['email']);
    $telefone = mysql_real_escape_string($_POST['telefone']);
    $endereco = mysql_real_escape_string($_POST['endereco']);
    $bairro = mysql_real_escape_string($_POST['bairro']);

    $sql = "UPDATE `usuarios` SET `nome` = '$nome', `email` = '$email', `telefone` = '$telefone', `endereco` = '$endereco', `bairro` = '$bairro', `cpf` = '$cpf' WHERE `id_usuario` = '$id_usuario'";
    $query = mysql_query($sql) or die(mysql_error());
    
?>