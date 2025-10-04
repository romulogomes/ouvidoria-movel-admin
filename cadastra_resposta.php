<?php
	include('conexao.php');

    if(!isset($_POST['descricao']) || !isset($_POST['reclamacao'])){
        echo "erro";
        return false;
    }

    $data =   date("Y-m-d");;
    $descricao = mysql_real_escape_string($_POST['descricao']);
    $reclamacao = $_POST['reclamacao'];
    $admin_fk = $_POST['admin_fk'];

    $sql = "INSERT INTO `respostas` (`id_resposta`, `data`, `descricao`, `reclamacao_fk`, `admin_fk`) 
                                         VALUES (NULL, '$data', '$descricao', '$reclamacao', '$admin_fk')";
    $query = mysql_query($sql) or die(mysql_error());

    
?>