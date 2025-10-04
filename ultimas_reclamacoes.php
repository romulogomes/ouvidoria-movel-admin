<?php

	include('conexao.php');

	$sql = "SELECT `id_reclamacao`, `numero_protocolo`, `descricao`,`data`, rec.`endereco`,`localizacao`, rec.`bairro`,`imagem_url`,`categoria_fk`, cat.nome as categoria, `usuario_fk`, usu.nome 

		FROM `reclamacoes` as rec, `categorias` as cat, `usuarios` as usu 

		WHERE `categoria_fk`= cat.id_categoria and usuario_fk = usu.id_usuario ORDER BY `data` DESC LIMIT 5";



    $query = mysql_query($sql) or die(mysql_error());

    $i = 0;

	

    while($row = mysql_fetch_array($query)){

		$infos[$i] = array("id_reclamacao" => $row['id_reclamacao'], "numero_protocolo" => $row['numero_protocolo'],
		
								"descricao" => $row['descricao'], "data" => $row['data'], "endereco" => $row['endereco'],

							   "localizacao" => $row['localizacao'], "bairro" => $row['bairro'],

							   "imagem_url" => $row['imagem_url'], "categoria" => $row['categoria'], "categoria_fk" => $row['categoria_fk'],

                               "usuario_fk" => $row['usuario_fk'], "nome_usuario" => $row['nome']); 

		$i++;		

    }

	

	

    if(!$i){

		$infos = array();

		echo json_encode($infos);

		return false;

	}

	else

	    echo json_encode($infos);

	

?>