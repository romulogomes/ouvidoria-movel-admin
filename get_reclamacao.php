<?php

	include('conexao.php');



	if(isset($_POST['id_reclamacao'])){

		$id_reclamacao = $_POST['id_reclamacao'];

		$sql = "SELECT `id_reclamacao`, `numero_protocolo`, `descricao`,`data`, rec.`endereco`,`localizacao`, rec.`bairro`,`imagem_url`, `status`,`categoria_fk`, cat.nome as categoria, `usuario_fk`, usu.nome, usu.token_cel

            FROM `reclamacoes` as rec, `categorias` as cat, `usuarios` as usu 

            WHERE `categoria_fk`= cat.id_categoria and usuario_fk = usu.id_usuario and rec.id_reclamacao = '$id_reclamacao'"; 

	}

    $query = mysql_query($sql) or die(mysql_error());

    $info = mysql_fetch_object($query);
    // $i = 0;

    // while($row = mysql_fetch_array($query)){

    //     $infos[$i] = array("id_reclamacao" => $row['id_reclamacao'], "descricao" => $row['descricao'], 

	// 						   "data" => $row['data'], "endereco" => $row['endereco'],

	// 						   "localizacao" => $row['localizacao'], "bairro" => $row['bairro'],

	// 						   "imagem_url" => $row['imagem_url'], "categoria" => $row['categoria'], "categoria_fk" => $row['categoria_fk'],

    //                            "usuario_fk" => $row['usuario_fk'], "nome_usuario" => $row['nome']); 

	// 	$i++;		

    // }

    echo json_encode($info);

	

?>