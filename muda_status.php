<?php
	include('conexao.php');

    if(!isset($_POST['id_ocorrencia']) || !isset($_POST['status'])){
        echo "erro";
        return false;
    }

    $data =   date("Y-m-d");;
    $descricao = mysql_real_escape_string($_POST['descricao']);
    $id = $_POST['id_ocorrencia'];
    $status = $_POST['status'];

    $sql = "UPDATE `ocorrencias` SET `status` = '$status' WHERE `ocorrencias`.`id_ocorrencia` = '$id'";
    $query = mysql_query($sql) or die(mysql_error());

    
?>