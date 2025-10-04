<?php
	include('conexao.php');

    $reclamacao = $_POST['reclamacao'];

    $sql = "SELECT * FROM `respostas`,  `admin` where `admin_fk` = `id_admin` and reclamacao_fk = '$reclamacao' ";

    $query = mysql_query($sql) or die(mysql_error());
    $i = 0;
    
    while($row = mysql_fetch_array($query)){
        $infos[$i] = array("id_resposta" => $row['id_resposta'], "data" => $row['data'], 
							   "descricao" => $row['descricao'], "reclamacao_fk" => $row['reclamacao_fk'], 
                               "admin_fk" => $row['admin_fk'], "nome" => $row['nome']); 
		$i++;	
    }
    if(!$i){
        
		return false;
	}
	else
	    echo json_encode($infos);
?>