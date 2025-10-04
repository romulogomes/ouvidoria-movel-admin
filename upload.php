<?php
  
  header('Access-Control-Allow-Origin: *');
  include('gera_protocolo.php');

    //conexao
  $servidor = 'bdouvidoria.mysql.uhserver.com';
  $usuario = 'romulodoit';
  $senha = 'Rouvi@2017';
  $banco = 'bdouvidoria';
  
  $link = mysql_connect($servidor, $usuario, $senha)
      or die('Não foi possivel conectar: ' . mysql_error());
   mysql_select_db($banco) or die('Não pude selecionar o banco de dados');

    

    //trata nome e imagem
    $nome_img = urldecode($_FILES["file"]["name"]);
    $tamanho = strlen($nome_img);
    
    if(substr($nome_img, $tamanho-3) !== 'jpg' && substr($nome_img, $tamanho-3) !== 'peg' && substr($nome_img, $tamanho-3) !== 'png'){
        $nome_img = $nome_img.'.jpg';
    }
    
    //$new_image_name = urldecode($_FILES["file"]["name"]);
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$nome_img);
    
    $usuario =   $_POST['usuario']; 
    $descricao = $_POST['descricao'];
    $data =      $_POST['data'];
    $endereco =  $_POST['endereco'];
    $localizacao =  $_POST['localizacao'];
    $img_url =  $nome_img;
    $categoria = $_POST['categoria'];

     if(!$usuario || !$categoria){
        echo "erro";
        return false;
    }

    $protocolo = geraNumeroProtocolo($_POST['usuario']);

    $sql = "INSERT INTO `reclamacoes` (`id_reclamacao`, `numero_protocolo`, `descricao`, `data`, `endereco`, `localizacao`, `status`, `bairro`, `imagem_url`, `categoria_fk`, `usuario_fk`) 
                                           VALUES (NULL, $protocolo, '$descricao', '$data', '$endereco', '$localizacao', 'Em Aberto','', '$img_url', '$categoria', '$usuario');";
    
    $query = mysql_query($sql) or die(mysql_error());
    
    echo $protocolo;
    return $protocolo;
 ?>
