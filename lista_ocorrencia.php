<?php
	include('conexao.php');

    if(!isset($_POST['usuario'])){
        echo "erro";
        return false;
    }
    $usuario = $_POST['usuario'];

    $sql = "SELECT `tipo_ocorrencia`.*, `ocorrencias`.* FROM tipo_ocorrencia, ocorrencias WHERE `id_tipo_ocorrencia`= `tipo` and `usuario_fk` = '$usuario'";

    if(isset($_POST['tipo'])){
        $tipo = $_POST['tipo'];
        $sql .= " and `tipo` = '$tipo'";
    }

    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
        $infos[$i] = array("id_ocorrencia" => $row['id_ocorrencia'], "numero_protocolo" => $row['numero_protocolo'], "data" => $row['data'], 
							   "tipo" => $row['tipo'], "setor" => $row['setor'], "status" => $row['status'],
							   "assunto" => $row['assunto'], "detalhes" => $row['detalhes']); 
		$i++;	
    }
    if(!$i){
		$infos = array("vazio" => "Sem ocorrências para esse usuário");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>