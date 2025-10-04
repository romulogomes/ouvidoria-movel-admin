<?php
	include('conexao.php');

    if(!isset($_POST['descricao']) || !isset($_POST['ocorrencia'])){
        echo "erro";
        return false;
    }

    $data =   date("Y-m-d");;
    $descricao = mysql_real_escape_string($_POST['descricao']);
    $ocorrencia = $_POST['ocorrencia'];
    $admin_fk = $_POST['admin_fk'];

    $sql = "INSERT INTO `respostas_ocorrencia` (`id_resposta`, `data`,  `descricao`, `ocorrencia_fk`, `admin_fk`) 
                                         VALUES (NULL, '$data', '$descricao', '$ocorrencia',  '$admin_fk')";
    $query = mysql_query($sql) or die(mysql_error());

    
?>