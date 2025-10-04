<?php
	include('conexao.php');

    if(!isset($_POST['id'])){
        echo "erro";
        return false;
    }
    $id_ocorrencia = $_POST['id'];

    $sql = "SELECT * FROM `ocorrencias`, `tipo_ocorrencia` as t WHERE id_ocorrencia = '$id_ocorrencia' and t.id_tipo_ocorrencia = tipo";

    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
      
            $infos[$i] = array("data" => $row['data'], "assunto" => $row['assunto'], "detalhes" => $row['detalhes'], "status" => $row['status'],
                                         "nome_cat" => $row['descricao'],  "setor" => $row['setor']); 
            $i++;
        
    }
    if(!$i){
		$infos = array("erro" => "Reclamacao nao encontrada");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>