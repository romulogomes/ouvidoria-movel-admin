<?php
date_default_timezone_set('America/Fortaleza');
require 'vendor/autoload.php';


$app = new Slim\App();

// $app->response->headers->set('Content-Type', 'application/json');
// $app->response->withHeader('Content-type', 'application/json;charset=utf-8');
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


//ROUTES
$app->get('/', function ($request, $response, $args) {
	$response->write("Web Service Working!");
	return $response;
});

// LOGIN

$app->post('/login', 'login');

// UPLOAD
$app->post('/upload', 'uploadimg');

//ADMINISTRADORES

$app->get('/administradores', 'getAdministradores');

$app->get('/administradores/{id}', 'getAdministrador');

$app->get('/admin/email/{email}', 'getAdminByEmail');

$app->post('/administradores', 'addAdministrador');

$app->put('/administradores/{id}', 'atualizaAdministrador');

$app->delete('/administradores/{id}', 'deleteAdministrador');

//CATEGORIAS
$app->get('/categorias', 'getCategorias');

$app->get('/categorias/{id}', 'getCategoria');

$app->post('/categorias', 'addCategoria');

$app->put('/categorias/{id}', 'atualizaCategoria');

$app->delete('/categorias/{id}', 'deleteCategoria');

//RECLAMAÇÕES
$app->get('/reclamacoes', 'getReclamacoes');

$app->get('/reclamacoes/status/{status}', 'getReclamacoesPorStatus');

$app->put('/reclamacoes/{id}/mudarstatus', 'mudarStatusReclamacao');

//OCORRÊNCIAS
$app->get('/ocorrencias', 'getOcorrencias');

$app->get('/ocorrencias/{id}', 'getOcorrencia');

$app->get('/ocorrencias/tipo/{tipo}', 'getOcorrenciasPorTipo');

$app->get('/ocorrencias/usuario/qtd/{id}', 'getQtdOcorrenciasUsuario');

$app->get('/ocorrencias/usuario/tipo/{id}/{tipo}', 'getOcorrenciasPorUsuario');

$app->post('/ocorrencias', 'addOcorrencia');

$app->put('/ocorrencias/{id}', 'atualizaOcorrencia');

$app->delete('/ocorrencias/{id}', 'deleteOcorrencia');

//RESPOSTAS
$app->get('/respostas', 'getRespostas');

$app->get('/respostas/{id}', 'getResposta');

//lista de respostas de uma ocorrência.
$app->get('/ocorrencias/respostas/{id}', 'getRespostasOcorrencia');

$app->post('/respostas', 'addResposta');

$app->post('/respostas_ocorrencias', 'addRespostaOcorrencia');

$app->put('/respostas/{id}', 'updateResposta');

$app->delete('/respostas/{id}', 'deleteResposta');

//USUÁRIOS
$app->get('/usuarios', 'getUsuarios');

$app->get('/usuarios/{id}', 'getUsuario');

$app->post('/usuarios', 'addUsuario');

$app->put('/usuarios/{id}', 'updateUsuario');

$app->delete('/usuarios/{id}', 'deleteUsuario');

$app->run();


//FUNÇÕES
function sendNotification($user_token, $notification_title, $notification_content, $reclamacao_id, $ocorrencia_id)
{

	$notification_url = "https://onesignal.com/api/v1/notifications";
	$app_id = "b2a2271d-d6de-4801-95d3-267fd73806a9";

	$data = array(
		'app_id' => $app_id,
		'include_player_ids' => array($user_token),
		'headings' => array(
			'en' => $notification_title
		),
		'contents' => array(
			'en' => $notification_content
		),
		'data' => array(
			'reclamacao_id' => $reclamacao_id,
			'ocorrencia_id' => $ocorrencia_id
		)
	);

	$ch = curl_init($notification_url);

	$payload = json_encode($data);

	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

	// Attach encoded JSON string to the POST fields
	curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

	// Return response instead of outputting
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

	// Set the content type to application/json
	curl_setopt(
		$ch,
		CURLOPT_HTTPHEADER,
		array(
			'Content-Type: application/json',
			'Content-Length: ' . strlen($payload)
		)
	);

	// Execute the POST request
	$result = curl_exec($ch);

	// Check for errors
	if ($result === FALSE) {
		die(curl_error($ch));
	}

	// Close cURL resource
	curl_close($ch);
}

// function getUsuarioReclamacao($id_reclamacao) {
// 	$conn = getConn();
// 	$sql = 'SELECT u.* FROM usuarios u JOIN reclamacoes r WHERE r.usuario_fk = u.id_usuario AND r.id_reclamacao = :id_reclamacao';
// 	$stmt = $conn->prepare($sql);
// 	$stmt->bindParam("id_reclamacao", $id_reclamacao);
// 	$stmt->execute();
// 	return $stmt->fetchObject();
// }

function getConn()
{
	return new PDO(
		'mysql:host=bdouvidoria.mysql.uhserver.com;dbname=bdouvidoria',
		'romulodoit',
		'Rouvi@2017',
		array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
	);
}

function login($request)
{
	$usuario = json_decode($request->getBody());
	$sql = "SELECT * FROM admin";
	$stmt = getConn()->query($sql);
	$usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
	$auth = false;
	foreach ($usuarios as $user) {
		if ($user->email == $usuario->email && $user->senha == $usuario->senha) {
			$auth = $user;
		}
	}
	echo json_encode($auth);
}

//ADMINISTRADORES
function getAdministradores()
{
	$sql = "SELECT * FROM `administradores`";
	$stmt = getConn()->query($sql);
	$administradores = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($administradores);
}

function getAdministrador($request, $response, $args)
{
	$conn = getConn();
	$sql = "SELECT * FROM administradores WHERE pk_administrador = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$administrador = $stmt->fetchObject();
	echo json_encode($administrador);
}

function getAdminByEmail($request, $response, $args)
{
	$conn = getConn();
	$sql = "SELECT * FROM admin WHERE email = :email";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("email", $args['email']);
	$stmt->execute();
	$administrador = $stmt->fetchObject();
	echo json_encode($administrador);
}

function addAdministrador($request)
{
	$administrador = json_decode($request->getBody());
	$sql = "INSERT INTO `administradores` (`pk_administrador`, `nome`, `email`, `senha`, `nivel`) VALUES (NULL, :nome, :email, :senha, :nivel)";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("nome", $administrador->nome);
	$stmt->bindParam("email", $administrador->email);
	$stmt->bindParam("senha", $administrador->senha);
	$stmt->bindParam("nivel", $administrador->nivel);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$administrador->pk_administrador = $conn->lastInsertId();
		$msg = $administrador;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function atualizaAdministrador($request, $response, $args)
{
	$administrador = json_decode($request->getBody());
	$administrador->pk_administrador = $args['id'];
	$sql = "UPDATE `administradores` SET `nome` = :nome, `email` = :email, `senha` = :senha, `nivel` = :nivel WHERE `administradores`.`pk_administrador` = :id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("nome", $administrador->nome);
	$stmt->bindParam("email", $administrador->email);
	$stmt->bindParam("senha", $administrador->senha);
	$stmt->bindParam("nivel", $administrador->nivel);
	$stmt->bindParam("id", $administrador->pk_administrador);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $administrador;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function deleteAdministrador($request, $response, $args)
{
	$sql = "DELETE FROM administradores WHERE pk_administrador=:id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $args['id'];
	} else {
		$msg = "error";
	}
	echo json_encode($msg);
}


//FUNÇÕES CATEGORIAS
function getCategorias()
{
	$sql = "SELECT * FROM categorias";
	$stmt = getConn()->query($sql);
	$categorias = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($categorias);
}

function getCategoria($request, $response, $args)
{
	$conn = getConn();
	$sql = "SELECT * FROM categorias WHERE pk_categoria = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$categoria = $stmt->fetchObject();
	echo json_encode($categoria);
}

function addCategoria($request)
{
	$categoria = json_decode($request->getBody());
	$sql = "INSERT INTO categorias (nome) values (:nome) ";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("nome", $categoria->nome);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$categoria->pk_categoria = $conn->lastInsertId();
		$msg = $categoria;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function atualizaCategoria($request, $response, $args)
{

	$categoria = json_decode($request->getBody());
	$categoria->pk_categoria = $args['id'];
	$sql = "UPDATE categorias SET nome=:nome WHERE pk_categoria=:id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("nome", $categoria->nome);
	$stmt->bindParam("id", $args['id']);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $categoria;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function deleteCategoria($request, $response, $args)
{
	$sql = "DELETE FROM categorias WHERE pk_categoria=:id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $args['id'];
	} else {
		$msg = "error";
	}
	echo json_encode($msg);
}

//RECLÇAMAÕES
function getReclamacoes($req, $res, $args)
{
	$conn = getConn();
	$sql = "SELECT * FROM reclamacoes";
	$stmt = $conn->query($sql);
	$reclamacoes = $stmt->fetchAll(PDO::FETCH_OBJ);
	return json_encode($reclamacoes);
}

function getReclamacoesPorStatus($req, $res, $args)
{
	$conn = getConn();
	$sql = "SELECT `id_reclamacao`, `status`, `descricao`,`data`, rec.`endereco`,`localizacao`, rec.`bairro`,`imagem_url`,`categoria_fk`, cat.nome as categoria, `usuario_fk`, usu.nome 
	FROM `reclamacoes` as rec, `categorias` as cat, `usuarios` as usu 
	WHERE `categoria_fk`= cat.id_categoria and usuario_fk = usu.id_usuario and rec.status = :status";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("status", $args['status']);
	$stmt->execute();
	$reclamacoes = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($reclamacoes);
}

function mudarStatusReclamacao($request, $res, $args)
{
	$reclamacao = json_decode($request->getBody());
	// $reclamacao->id_reclamacao = $args['id_reclamacao'];
	// $reclamacao->status = $args['status'];
	$sql = "UPDATE `reclamacoes` SET `status` = :status WHERE `reclamacoes`.`id_reclamacao` = :id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("status", $reclamacao->status);
	$stmt->bindParam("id", $reclamacao->id_reclamacao);
	$msg = new stdClass();
	if ($stmt->execute()) {
		$usuario = getUsuarioReclamacao($reclamacao->id_reclamacao);
		sendNotification($usuario->token_cel, 'Temos uma novidade!', 'O status da sua reclamação foi alterado, clique e saiba mais.', $reclamacao->id_reclamacao, null);
		$msg = $reclamacao;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

//OCORRÊNCIAS
function getOcorrencias()
{
	$sql = "SELECT `pk_ocorrencia`, `data`, `assunto`, `descricao`, `tipo`, `status`, `setores`.`pk_setor`, `setores`.`nome`, `usuarios`.`pk_usuario`, `usuarios`.`nome` FROM `ocorrencias` INNER JOIN `usuarios` LEFT JOIN `setores` ON `fk_setor` = `pk_setor` WHERE `fk_usuario` = `pk_usuario`";
	$stmt = getConn()->query($sql);
	$ocorrencias = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($ocorrencias);
}

function getOcorrencia($request, $response, $args)
{
	$conn = getConn();
	$sql = "SELECT `pk_ocorrencia`, `data`, `assunto`, `descricao`, `tipo`, `status`, `setores`.`pk_setor`, `setores`.`nome`, `usuarios`.`pk_usuario`, `usuarios`.`nome` FROM `ocorrencias` INNER JOIN `usuarios` LEFT JOIN `setores` ON `fk_setor` = `pk_setor` WHERE `fk_usuario` = `pk_usuario` AND `ocorrencias`.`pk_ocorrencia` = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$ocorrencia = $stmt->fetchObject();
	echo json_encode($ocorrencia);
}

function getOcorrenciasPorTipo($request, $response, $args)
{
	$conn = getConn();
	if ($args['tipo'] == '4') {
		$sql = "SELECT `pk_ocorrencia`, `data`, `assunto`, `descricao`, `tipo`, `status`, `setores`.`pk_setor`, `setores`.`nome` AS nome_setor, `usuarios`.`pk_usuario`, `usuarios`.`nome` as nome_usuario, `pk_reclamacao`, `reclamacoes`.`endereco` FROM `ocorrencias` INNER JOIN `reclamacoes` INNER JOIN `usuarios` LEFT JOIN `setores` ON `fk_setor` = `pk_setor` WHERE `fk_ocorrencia`=`pk_ocorrencia` AND `fk_usuario` = `pk_usuario` AND `ocorrencias`.tipo = :tipo";
	} else {
		$sql = "SELECT `pk_ocorrencia`, `data`, `assunto`, `descricao`, `tipo`, `status`, `setores`.`pk_setor`, `setores`.`nome`, `usuarios`.`pk_usuario`, `usuarios`.`nome` FROM `ocorrencias` INNER JOIN `usuarios` LEFT JOIN `setores` ON `fk_setor` = `pk_setor` WHERE `fk_usuario` = `pk_usuario` AND `ocorrencias`.tipo = :tipo";
	}
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("tipo", $args['tipo']);
	$stmt->execute();
	$ocorrencias = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($ocorrencias);
}

function getOcorrenciasPorUsuario($request, $response, $args)
{
	$conn = getConn();
	if ($args['tipo'] == '4') {
		$sql = "SELECT `pk_ocorrencia`, `data`, `assunto`, `descricao`, `tipo`, `status`, `setores`.`pk_setor`, `setores`.`nome` AS nome_setor, `usuarios`.`pk_usuario`, `usuarios`.`nome` as nome_usuario, `pk_reclamacao`, `reclamacoes`.`endereco` FROM `ocorrencias` INNER JOIN `reclamacoes` INNER JOIN `usuarios` LEFT JOIN `setores` ON `fk_setor` = `pk_setor` WHERE `fk_ocorrencia`=`pk_ocorrencia` AND `fk_usuario` = `pk_usuario` AND `usuarios`.`pk_usuario` = :id AND `ocorrencias`.tipo = :tipo";
	} else {
		$sql = "SELECT `pk_ocorrencia`, `data`, `assunto`, `descricao`, `tipo`, `status`, `setores`.`pk_setor`, `setores`.`nome`, `usuarios`.`pk_usuario`, `usuarios`.`nome` FROM `ocorrencias` INNER JOIN `usuarios` LEFT JOIN `setores` ON `fk_setor` = `pk_setor` WHERE `fk_usuario` = `pk_usuario` AND `usuarios`.`pk_usuario` = :id AND `ocorrencias`.tipo = :tipo";
	}
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("tipo", $args['tipo']);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$ocorrencias = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($ocorrencias);
}

function getQtdOcorrenciasUsuario($request, $response, $args)
{

	//Sugestões
	$conn = getConn();
	$sql = "SELECT COUNT(`ocorrencias`.`pk_ocorrencia`) AS `sugestoes` FROM `ocorrencias` WHERE `ocorrencias`.`fk_usuario` = :id AND `ocorrencias`.`tipo` = 1";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$quantidades[0] = $stmt->fetchObject();

	//Críticas
	$sql = "SELECT COUNT(`ocorrencias`.`pk_ocorrencia`) AS `criticas` FROM `ocorrencias` WHERE `ocorrencias`.`fk_usuario` = :id AND `ocorrencias`.`tipo` = 2";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$quantidades[1] = $stmt->fetchObject();

	//Denúncias
	$sql = "SELECT COUNT(`ocorrencias`.`pk_ocorrencia`) AS `denuncias` FROM `ocorrencias` WHERE `ocorrencias`.`fk_usuario` = :id AND `ocorrencias`.`tipo` = 3";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$quantidades[2] = $stmt->fetchObject();

	//Reclamações
	$sql = "SELECT COUNT(`ocorrencias`.`pk_ocorrencia`) AS `reclamacoes` FROM `ocorrencias` WHERE `ocorrencias`.`fk_usuario` = :id AND `ocorrencias`.`tipo` = 4";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$quantidades[3] = $stmt->fetchObject();

	echo json_encode($quantidades);
}

function addOcorrencia($request)
{

	$ocorrencia = json_decode($request->getBody());

	//gera o protocolo
	$protocolo = date("YmdHis") . $ocorrencia->tipo . $ocorrencia->fk_usuario;
	$ocorrencia->protocolo = $protocolo;
	$ocorrencia->data = date("Y-m-d");

	$usuario_ocorrencia = getUsuarioOcorrencia($resposta->reclamacao);

	$sql = "INSERT INTO `ocorrencias` (`pk_ocorrencia`, `data`, `assunto`, `descricao`, `fk_usuario`, `fk_setor`, `status`, `tipo`, `protocolo`) VALUES (NULL, :data, :assunto, :descricao, :fk_usuario, :fk_setor, :status, :tipo, :protocolo)";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("data", $ocorrencia->data);
	$stmt->bindParam("assunto", $ocorrencia->assunto);
	$stmt->bindParam("descricao", $ocorrencia->descricao);
	$stmt->bindParam("fk_usuario", $ocorrencia->fk_usuario);
	$stmt->bindParam("fk_setor", $ocorrencia->fk_setor);
	$stmt->bindParam("status", $ocorrencia->status);
	$stmt->bindParam("tipo", $ocorrencia->tipo);
	$stmt->bindParam("protocolo", $ocorrencia->protocolo);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$ocorrencia->pk_ocorrencia = $conn->lastInsertId();
		if ($ocorrencia->tipo == '4') {
			$sql = "INSERT INTO `reclamacoes` (`pk_reclamacao`, `endereco`, `localizacao`, `bairro`, `image_url`, `fk_categoria`, `fk_ocorrencia`) VALUES (NULL, :endereco, :localizacao, :bairro, :image_url, :fk_categoria, :fk_ocorrencia)";
			$stmt = $conn->prepare($sql);
			$stmt->bindParam("endereco", $ocorrencia->endereco);
			$stmt->bindParam("localizacao", $ocorrencia->localizacao);
			$stmt->bindParam("bairro", $ocorrencia->bairro);
			$stmt->bindParam("image_url", $ocorrencia->image_url);
			$stmt->bindParam("fk_categoria", $ocorrencia->fk_categoria);
			$stmt->bindParam("fk_ocorrencia", $ocorrencia->pk_ocorrencia);
			if ($stmt->execute()) {
				$ocorrencia->pk_reclamacao = $conn->lastInsertId();
				$msg = $ocorrencia;
			} else {
				$msg = "error";
			}
		} else {
			$msg = $ocorrencia;
		}
	} else {
		$msg = "error";
	}
	echo json_encode($msg);
}

function atualizaOcorrencia($request, $response, $args)
{
	$ocorrencia = json_decode($request->getBody());
	$ocorrencia->pk_ocorrencia = $args['id'];
	$sql = "UPDATE `ocorrencias` SET `tipo` = :tipo, `fk_setor` = :fk_setor, `data` = :data, `assunto` = :assunto, `descricao` = :descricao, `fk_usuario` = :fk_usuario, `status` = :status WHERE `ocorrencias`.`pk_ocorrencia` = :id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("tipo", $ocorrencia->tipo);
	$stmt->bindParam("fk_setor", $ocorrencia->fk_setor);
	$stmt->bindParam("data", $ocorrencia->data);
	$stmt->bindParam("assunto", $ocorrencia->assunto);
	$stmt->bindParam("descricao", $ocorrencia->descricao);
	$stmt->bindParam("fk_usuario", $ocorrencia->fk_usuario);
	$stmt->bindParam("status", $ocorrencia->status);
	$stmt->bindParam("id", $ocorrencia->pk_ocorrencia);
	$msg = new stdClass();
	if ($stmt->execute()) {
		if ($ocorrencia->tipo == '4') {
			$sql = "UPDATE `reclamacoes` SET `endereco` = :endereco, `localizacao` = :localizacao, `bairro` = :bairro, `image_url` = :image_url, `fk_categoria` = :fk_categoria, `fk_ocorrencia` = :fk_ocorrencia WHERE `reclamacoes`.`pk_reclamacao` = 3";
			$stmt = $conn->prepare($sql);
			$stmt->bindParam("endereco", $ocorrencia->endereco);
			$stmt->bindParam("localizacao", $ocorrencia->localizacao);
			$stmt->bindParam("bairro", $ocorrencia->bairro);
			$stmt->bindParam("image_url", $ocorrencia->image_url);
			$stmt->bindParam("fk_categoria", $ocorrencia->fk_categoria);
			$stmt->bindParam("fk_ocorrencia", $ocorrencia->pk_ocorrencia);
			if ($stmt->execute()) {
				$msg = $ocorrencia;
			} else {
				$msg = "error";
			}
		} else {
			$msg = $ocorrencia;
		}
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function deleteOcorrencia($request, $response, $args)
{
	$sql = "DELETE FROM ocorrencias WHERE pk_ocorrencia=:id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $args['id'];
	} else {
		$msg = "error";
	}
	echo json_encode($msg);
}

//RESPOSTAS
function getRespostas()
{
	$sql = "SELECT * FROM respostas";
	$stmt = getConn()->query($sql);
	$respostas = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($respostas);
}

function getRespostasOcorrencia($request, $response, $args)
{
	$sql = "SELECT data, prazo, descricao FROM respostas WHERE fk_ocorrencia = :fk_ocorrencia";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("fk_ocorrencia", $args['id']);
	$msg = new stdClass();
	if ($stmt->execute()) {
		$respostas = $stmt->fetchAll(PDO::FETCH_OBJ);
		$msg = $respostas;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function getResposta($request, $response, $args)
{
	$conn = getConn();
	$sql = "SELECT * FROM respostas WHERE pk_resposta=:id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$resposta = $stmt->fetchObject();

	echo json_encode($resposta);
}

function addResposta($request)
{
	$resposta = json_decode($request->getBody());

	$usuario_ocorrencia = getUsuarioReclamacao($resposta->reclamacao);

	$sql = "INSERT INTO `respostas` (`id_resposta`, `data`, `descricao`, `reclamacao_fk`, `admin_fk`) VALUES (NULL, :data, :descricao, :fk_reclamacao, :fk_administrador)";
	$conn = getConn();
	$stmt = $conn->prepare($sql);

	$data = date("Y-m-d");
	$stmt->bindParam("data", $data);
	$stmt->bindParam("descricao", utf8_encode($resposta->descricao));
	$stmt->bindParam("fk_reclamacao", $resposta->reclamacao);
	$stmt->bindParam("fk_administrador", $resposta->admin_fk);
	$msg = new stdClass();
	if ($stmt->execute()) {
		$resposta->pk_resposta = $conn->lastInsertId();
		$msg = $resposta;
		sendNotification($usuario_ocorrencia->token_cel, 'Temos uma novidade!', 'A sua reclamação foi respondida, clique e saiba mais', $resposta->reclamacao, null);
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function addRespostaOcorrencia($request)
{
	$resposta = json_decode($request->getBody());

	$usuario_ocorrencia = getUsuarioOcorrencia($resposta->ocorrencia);

	$sql = "INSERT INTO `respostas_ocorrencia` (`id_resposta`, `data`, `descricao`, `ocorrencia_fk`, `admin_fk`) VALUES (NULL, :data, :descricao, :fk_ocorrencia, :fk_administrador)";
	$conn = getConn();
	$stmt = $conn->prepare($sql);

	$data = date("Y-m-d");
	$stmt->bindParam("data", $data);
	$stmt->bindParam("descricao", utf8_encode($resposta->descricao));
	$stmt->bindParam("fk_ocorrencia", $resposta->ocorrencia);
	$stmt->bindParam("fk_administrador", $resposta->admin_fk);
	$msg = new stdClass();
	if ($stmt->execute()) {
		$resposta->pk_resposta = $conn->lastInsertId();
		$msg = $resposta;
		sendNotification($usuario_ocorrencia->token_cel, 'Temos uma novidade!', 'A sua ocorrencia foi respondida, clique e saiba mais', null, $resposta->ocorrencia);
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function updateResposta($request, $response, $args)
{
	$resposta = json_decode($request->getBody());
	$resposta->pk_resposta = $args['id'];
	$sql = "UPDATE `respostas` SET `data` = :data, `prazo` = :prazo, `descricao` = :descricao WHERE `respostas`.`pk_resposta` = :id";

	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("data", $resposta->data);
	$stmt->bindParam("prazo", $resposta->prazo);
	$stmt->bindParam("descricao", $resposta->descricao);
	$stmt->bindParam("id", $resposta->pk_resposta);

	$msg = new stdClass();

	if ($stmt->execute()) {
		$msg = $resposta;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function deleteResposta($request, $response, $args)
{
	$sql = "DELETE FROM respostas WHERE pk_resposta=:id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $args['id'];
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}


//USUARIOS
function getUsuarios($request, $response, $args)
{
	$sql = "SELECT * FROM usuarios WHERE 1";
	$stmt = getConn()->query($sql);
	$usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
	echo json_encode($usuarios);
}

function getUsuario($request, $response, $args)
{
	$conn = getConn();
	$sql = "SELECT pk_usuario, nome, email, telefone, bairro FROM usuarios WHERE pk_usuario = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	$stmt->execute();
	$usuario = $stmt->fetchObject();
	echo json_encode($usuario);
}

function getUsuarioReclamacao($id_reclamacao) {
	$conn = getConn();
	$sql = "SELECT id_usuario, nome, token_cel FROM usuarios JOIN reclamacoes ON usuarios.id_usuario = reclamacoes.usuario_fk WHERE id_reclamacao = :id_reclamacao";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id_reclamacao", $id_reclamacao);
	$stmt->execute();
	$usuario = $stmt->fetchObject();
	return $usuario;
}

function getUsuarioOcorrencia($id_ocorrencia) {
	$conn = getConn();
	$sql = "SELECT id_usuario, nome, token_cel FROM usuarios JOIN ocorrencias ON usuarios.id_usuario = ocorrencias.usuario_fk WHERE id_ocorrencia = :id_ocorrencia";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id_ocorrencia", $id_ocorrencia);
	$stmt->execute();
	$usuario = $stmt->fetchObject();
	return $usuario;
}

function addUsuario($request)
{
	$usuario = json_decode($request->getBody());
	$sql = "INSERT INTO `usuarios` (`pk_usuario`, `nome`, `email`, `telefone`, `endereco`, `bairro`, `senha`) VALUES (NULL, :nome, :email, :telefone, :endereco, :bairro, :senha)";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("nome", $usuario->nome);
	$stmt->bindParam("email", $usuario->email);
	$stmt->bindParam("telefone", $usuario->telefone);
	$stmt->bindParam("endereco", $usuario->endereco);
	$stmt->bindParam("bairro", $usuario->bairro);
	$stmt->bindParam("senha", $usuario->senha);
	$msg = new stdClass();

	if ($stmt->execute()) {
		$usuario->pk_usuario = $conn->lastInsertId();
		$msg = $usuario;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function updateUsuario($request, $response, $args)
{
	$usuario = json_decode($request->getBody());
	$usuario->pk_usuario = $args['id'];
	$sql = "UPDATE `usuarios` SET `nome` = :nome, `email` = :email, `telefone` = :telefone, `endereco` = :endereco, `bairro` = :bairro, `senha` = :senha WHERE `usuarios`.`pk_usuario` = :id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("nome", $usuario->nome);
	$stmt->bindParam("email", $usuario->email);
	$stmt->bindParam("telefone", $usuario->telefone);
	$stmt->bindParam("endereco", $usuario->endereco);
	$stmt->bindParam("bairro", $usuario->bairro);
	$stmt->bindParam("senha", $usuario->senha);
	$stmt->bindParam("id", $usuario->pk_usuario);

	$msg = new stdClass();
	if ($stmt->execute()) {
		$msg = $usuario;
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}

function deleteUsuario($request, $response, $args)
{
	$sql = "DELETE FROM usuarios WHERE pk_usuario=:id";
	$conn = getConn();
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id", $args['id']);
	if ($stmt->execute()) {
		$msg = $args['id'];
	} else {
		$msg = "error";
	}

	echo json_encode($msg);
}
