<?php
    header('Access-Control-Allow-Origin: *');

    $servidor = 'bdouvidoria.mysql.uhserver.com';
    $usuario = 'romulodoit';
    $senha = 'Rouvi@2017';
    $banco = 'bdouvidoria';

    $conexao = mysqli_connect($servidor, $usuario, $senha, $banco);

    if (!$conexao) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }

	if(!isset($_GET['email'])){
	        echo "erro, e-mail não enviado";
	        return false;
    }
    
	$email = $_GET['email'];

    $sql = "SELECT * FROM `usuarios` WHERE `email` = '$email'";
    $query = mysqli_query($conexao, $sql) or die(mysqli_error());
    $i = 0;

    while($row = mysqli_fetch_array($query)){
    	$senha = $row['senha'];
        $i++;
    }

    if ($i == 0) {
        echo "404";
        return false;
    } else {
          $mensagem = "Sua senha no APP Ouvidoria Móvel é: ". $senha;
          mail($email, "Recuperar Senha", $mensagem, "From: contato@doitsolucoes.com");

    }

?>