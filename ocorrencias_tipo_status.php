<?php

	include('conexao.php');

    if(!isset($_POST['tipo']) && !isset($_POST['status'])){

        echo "erro";

        return false;

    }

    $tipo = $_POST['tipo'];
    $status = $_POST['status'];



    $sql = "SELECT `tipo_ocorrencia`.*, `ocorrencias`.*, `usuarios`.`nome` FROM tipo_ocorrencia, ocorrencias, usuarios WHERE `id_tipo_ocorrencia`= `tipo` AND `usuario_fk` = `id_usuario` AND `tipo` = '$tipo' AND `status` = '$status'";


    $query = mysql_query($sql) or die(mysql_error());

    $i = 0;

    $infos = array();
    while($row = mysql_fetch_array($query)){

        $infos[$i] = array("id_ocorrencia" => $row['id_ocorrencia'], "numero_protocolo" => $row['numero_protocolo'], 
        
                                "data" => $row['data'], "tipo" => $row['tipo'], "setor" => $row['setor'],

							   "assunto" => $row['assunto'], "detalhes" => $row['detalhes'], "status" => $row['status'],
                               
                               "usuario_fk" => $row['usuario_fk'], "nome" => $row['nome']); 

		$i++;	

    }

    // if(!$i){

	// 	$infos = array("vazio" => "Sem ocorrências para esse status");

	// 	echo json_encode($infos);

	// 	return false;

	// }

	// else

	echo json_encode($infos);

?>