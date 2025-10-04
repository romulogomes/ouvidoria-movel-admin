<?php

	include('conexao.php');

    $id = $_POST['id_usuario'];

    $sql = "SELECT * FROM `usuarios` WHERE id_usuario = '$id'";



    $query = mysql_query($sql) or die(mysql_error());

	$info = mysql_fetch_object($query);

    echo json_encode($info);

?>