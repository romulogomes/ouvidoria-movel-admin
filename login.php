<?php
	include('conexao.php');

    if(!isset($_POST['cpf_ou_email']) || !isset($_POST['senha'])){
        echo "campos vazios";
        return false;
    }

    $cpf_ou_email = mysql_real_escape_string($_POST['cpf_ou_email']);
    $senha = mysql_real_escape_string($_POST['senha']);

    if(isset($_POST['app'])){
        $sql = "SELECT * FROM `usuarios` WHERE (`email` = '$cpf_ou_email' or `cpf` = '$cpf_ou_email') and `senha` = '$senha' and `ativo` = 1";
        $query = mysql_query($sql) or die(mysql_error());
        $i = 0;

        while($row = mysql_fetch_array($query)){
            $infos[$i] = array("id_usuario" => $row['id_usuario'], "nome" => $row['nome'], 
                                "email" => $row['email'], "telefone" => $row['telefone'],
                                "bairro" => $row['bairro'], "token_cel" => $row['token_cel']); 
            $i++;
        }
    }
    else{
        $sql = "SELECT * FROM `admin` WHERE `email` = '$email' and `senha` = '$senha'";
        $query = mysql_query($sql) or die(mysql_error());
        $i = 0;

        while($row = mysql_fetch_array($query)){
            $infos[$i] = array("id_admin" => $row['id_admin'], "nome" => $row['nome'], 
                                "email" => $row['email'], "nivel" => $row['nivel']); 
            $i++;
        }
    }
    
    if(!$i){
        echo 'Usuário nao encontrado';
	 	return false;
	 }
	 else
	     echo json_encode($infos);
?>