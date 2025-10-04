<?php
    include('conexao.php');
    include('gera_protocolo.php');

    if(!isset($_POST['tipo']) || !isset($_POST['usuario'])){
        echo "erro";
        return false;
    }


    $protocolo = geraNumeroProtocolo($_POST['usuario']);

    $tipo =   $_POST['tipo'];    
    $setor =   $_POST['setor'];
    $data =   $_POST['data'];
    $assunto = mysql_real_escape_string($_POST['assunto']);
    $detalhes = mysql_real_escape_string($_POST['detalhes']);
    $usuario = $_POST['usuario'];

    $sql = "INSERT INTO `bdouvidoria`.`ocorrencias` (`id_ocorrencia`, `numero_protocolo`, `tipo`, `setor`, `data`, `assunto`, `detalhes`, `status`, `usuario_fk`) 
                                             VALUES (NULL, $protocolo, '$tipo', '$setor', '$data', '$assunto', '$detalhes', 'Em Aberto', '$usuario')";

    $query = mysql_query($sql) or die(mysql_error());

    echo $protocolo;
        
?>