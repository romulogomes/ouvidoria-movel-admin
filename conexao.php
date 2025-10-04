<?php
  
  header('Access-Control-Allow-Origin: *');

  $servidor = 'bdouvidoria.mysql.uhserver.com';
  $usuario = 'romulodoit';
  $senha = 'Rouvi@2017';
  $banco = 'bdouvidoria';
  
  $link = mysql_connect($servidor, $usuario, $senha)
      or die('Não foi possivel conectar: ' . mysql_error());
   mysql_select_db($banco) or die('Não pude selecionar o banco de dados');
 
 ?>
