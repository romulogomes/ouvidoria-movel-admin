<?php

	include('conexao.php');



    if(!isset($_POST['tipo'])){

        echo "erro";

        return false;

    }

    $tipo = $_POST['tipo'];



    $sql = "SELECT `tipo_ocorrencia`.*, `ocorrencias`.*, `usuarios`.`nome` FROM tipo_ocorrencia, ocorrencias, usuarios WHERE `id_tipo_ocorrencia`= `tipo` AND `usuario_fk` = `id_usuario` AND `tipo` = '$tipo'";


    $query = mysql_query($sql) or die(mysql_error());

    $i = 0;

    while($row = mysql_fetch_array($query)){

        $infos[$i] = array("id_ocorrencia" => $row['id_ocorrencia'], "numero_protocolo" => $row['numero_protocolo'], 
        
                                "data" => $row['data'], "tipo" => $row['tipo'], "setor" => $row['setor'],

							   "assunto" => $row['assunto'], "detalhes" => $row['detalhes'], "status" => $row['status'],
                               
                               "usuario_fk" => $row['usuario_fk'], "nome" => $row['nome']); 

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