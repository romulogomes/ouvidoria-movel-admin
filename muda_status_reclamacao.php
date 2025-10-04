<?php
	include('conexao.php');

    if(!isset($_POST['id_reclamacao']) || !isset($_POST['status'])){
        echo "erro";
        return false;
    }

    $data =   date("Y-m-d");;
    $descricao = mysql_real_escape_string($_POST['descricao']);
    $id = $_POST['id_reclamacao'];
    $status = $_POST['status'];

    $sql = "UPDATE `reclamacoes` SET `status` = '$status' WHERE `reclamacoes`.`id_reclamacao` = '$id'";
    $query = mysql_query($sql) or die(mysql_error());

    
?>