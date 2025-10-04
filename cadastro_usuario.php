<?php
	include('conexao.php');

    if(!isset($_POST['nome']) || !isset($_POST['email'])){
      return false;
    }

    $nome =       mysql_real_escape_string($_POST['nome']);
    $cpf =        mysql_real_escape_string($_POST['cpf']);
    $email =      mysql_real_escape_string($_POST['email']);
    $telefone =   mysql_real_escape_string($_POST['telefone']);
    $endereco =   mysql_real_escape_string($_POST['endereco']);
    $bairro =     mysql_real_escape_string($_POST['bairro']);
    $senha =      mysql_real_escape_string($_POST['senha']);
    $token_cel =  mysql_real_escape_string($_POST['token_cel']);

    $sql = "SELECT * FROM `usuarios` WHERE `cpf` = '$cpf'";
    $query = mysql_query($sql) or die(mysql_error());
    $num_rows = mysql_num_rows($query);

    if($num_rows > 0) {
        $infos = array("validacao" => "CPF já cadastrado, se não lembrar da senha clique em Esqueci a senha");
        echo json_encode($infos);
        return false;
    }

    $sql = "INSERT INTO `bdouvidoria`.`usuarios` (`id_usuario`, `nome`, `email`, `telefone`, `endereco`, `bairro`, `senha`, `token_cel`, `cpf`)
                                           VALUES (NULL, '$nome', '$email', '$telefone', '$endereco', '$bairro', '$senha', '$token_cel', '$cpf');";
    $query = mysql_query($sql) or die(mysql_error());
?>