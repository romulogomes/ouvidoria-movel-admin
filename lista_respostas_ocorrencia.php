<?php

	include('conexao.php');



    $ocorrencia = $_POST['ocorrencia'];



    $sql = "SELECT `respostas_ocorrencia`.*, `admin`.`id_admin`, `admin`.`nome` FROM `respostas_ocorrencia`,  `admin`  where `admin_fk` = `id_admin` and ocorrencia_fk = '$ocorrencia'";



    $query = mysql_query($sql) or die(mysql_error());

    $i = 0;

    

    while($row = mysql_fetch_array($query)){

        $infos[$i] = array("id_resposta" => $row['id_resposta'], "data" => $row['data'], 

							   "descricao" => $row['descricao'],

							   "ocorrencia_fk" => $row['ocorrencia_fk'], 

							   "id_admin" => $row['id_admin'], 
							   
							   "nome" => $row['nome']); 

		$i++;	

    }

    if(!$i){

		return false;

	}

	else

	    echo json_encode($infos);

?>