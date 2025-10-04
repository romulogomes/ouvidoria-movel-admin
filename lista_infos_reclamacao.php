<?php
	include('conexao.php');

    if(!isset($_POST['id'])){
        echo "erro";
        return false;
    }
    $id_reclamacao = $_POST['id'];

    $sql = "SELECT * FROM `reclamacoes`, `categorias` as cat WHERE id_reclamacao = '$id_reclamacao' and cat.id_categoria = categoria_fk";

    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
      
            $infos[$i] = array("descricao" => $row['descricao'], "data" => $row['data'], "status" => $row['status'],
                                "localizacao" => $row['localizacao'], "bairro" => $row['bairro'], "endereco" => $row['endereco'],
                                "imagem_url" => $row['imagem_url'], "nome_cat" => $row['nome'], "endereco" => $row['endereco']
                                ); 
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