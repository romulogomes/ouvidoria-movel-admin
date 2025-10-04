<?php

	include('conexao.php');

    $id = $_POST['id_usuario'];
    $status = $_POST['status'];

    $sql = "UPDATE `usuarios` SET `ativo` = '$status' WHERE `usuarios`.`id_usuario` = '$id';";

    $query = mysql_query($sql) or die(mysql_error());

    $sql = "SELECT * FROM `usuarios` WHERE id_usuario = '$id'";

    $query = mysql_query($sql) or die(mysql_error());

	$info = mysql_fetch_object($query);

    echo json_encode($info);


?>