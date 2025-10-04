<?php
	include('conexao.php');

    if(!isset($_POST['usuario'])){
        echo "erro";
        return false;
    }
    $usuario = $_POST['usuario'];

    $infos = array("qtd_denuncia" => '', "qtd_sugestao" => '', "qtd_critica" => '', "qtd_reclamacoes" => '');
    
    $sql = "SELECT COUNT(`id_reclamacao`) as qtd_denuncia FROM `reclamacoes` where `usuario_fk` = '$usuario'";
    $query = mysql_query($sql) or die(mysql_error());
    while($row = mysql_fetch_array($query)){
        $infos["qtd_reclamacoes"] = $row['qtd_denuncia']; 	
    }
    
    
    $sql = "SELECT COUNT(`id_ocorrencia`) as qtd_denuncia FROM `ocorrencias` where `usuario_fk` = '$usuario' and tipo = 3 ";
    $query = mysql_query($sql) or die(mysql_error());
    while($row = mysql_fetch_array($query)){
        $infos["qtd_denuncia"] = $row['qtd_denuncia']; 	
    }

    $sql = "SELECT COUNT(`id_ocorrencia`) as qtd_denuncia FROM `ocorrencias` where `usuario_fk` = '$usuario' and tipo = 1 ";
    $query = mysql_query($sql) or die(mysql_error());
    while($row = mysql_fetch_array($query)){
        $infos["qtd_sugestao"] = $row['qtd_denuncia']; 	
    }

    $sql = "SELECT COUNT(`id_ocorrencia`) as qtd_denuncia FROM `ocorrencias` where `usuario_fk` = '$usuario' and tipo = 5";
    $query = mysql_query($sql) or die(mysql_error());
    while($row = mysql_fetch_array($query)){
        $infos["qtd_critica"] = $row['qtd_denuncia']; 	
    }

    echo json_encode($infos);
?>