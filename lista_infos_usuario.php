<?php
	include('conexao.php');

    if(!isset($_POST['usuario'])){
        echo "erro";
        return false;
    }
    $usuario = $_POST['usuario'];

    $sql = "SELECT * FROM `usuarios` WHERE `id_usuario` = '$usuario'";

    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
        $infos[$i] = array("id_usuario" => $row['id_usuario'], "nome" => $row['nome'], "cpf" => $row['cpf'], 
							   "email" => $row['email'], "telefone" => $row['telefone'],
							   "endereco" => $row['endereco'], "bairro" => $row['bairro']); 
		$i++;	
    }
    if(!$i){
		$infos = array("vazio" => "Usuário nao encontrado");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>