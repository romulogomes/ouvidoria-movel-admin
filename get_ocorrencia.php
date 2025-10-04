<?php

	include('conexao.php');



	if(isset($_POST['id_ocorrencia'])){

		$id_ocorrencia = $_POST['id_ocorrencia'];

		$sql = "SELECT `tipo_ocorrencia`.*, `ocorrencias`.*, `usuarios`.`nome`, `usuarios`.`token_cel` FROM tipo_ocorrencia, ocorrencias, usuarios WHERE `id_tipo_ocorrencia`= `tipo` and `usuario_fk` = `id_usuario` and `id_ocorrencia` = '$id_ocorrencia'"; 

	}

    $query = mysql_query($sql) or die(mysql_error());

    $info = mysql_fetch_object($query);

    echo json_encode($info);

	

?>