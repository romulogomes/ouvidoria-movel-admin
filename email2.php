<?php
include('conexao.php');

	if(!isset($_POST['email'])){
	        echo "erro";
	        return false;
    }
    
	$email = $_POST['email'];

    $sql = "SELECT * FROM `usuarios` WHERE `email` = '$email'";
    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;

    while($row = mysql_fetch_array($query)){
    	$senha = $row['senha'];
        $i++;
    }

    if($i == 0){
        echo "404";
        return false;
    }
    else{
          $mensagem = "Senha no APP Ouvidoria Móvel Itapipoca é :". $senha;
          mail("romulogomes93@gmail.com", "Recuperar Senha", $mensagem, "From: contato@doitsolucoes.com");

    }



?>