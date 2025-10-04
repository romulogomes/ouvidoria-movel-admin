<?php
	include('conexao.php');

    $sql = "SELECT * FROM `usuarios`";

    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
        $infos[$i] = array("id_usuario" => $row['id_usuario'], "nome" => $row['nome'], 
							   "email" => $row['email'], "endereco" => $row['endereco'],
							   "telefone" => $row['telefone'], "bairro" => $row['bairro'], 
							   "ativo" => $row['ativo']); 
		$i++;	
    }
    if(!$i){
		$infos = array("erro" => "Não há usuarios cadastrados");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>