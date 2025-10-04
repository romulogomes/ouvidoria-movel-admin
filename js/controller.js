var app = angular.module('login', []);

app.controller('telaLoginCtrl', ['$scope', '$http', function($scope, $http){
	$scope.tab = 1;

	$scope.setTab = function(tab) {
		if(tab) {
			$scope.tab = tab;
		}
	}

	$scope.isSetTab = function(tab) {
		if(tab){
			return $scope.tab === tab;
		}
	}

  var url_gestor = "http://extranet.saude.ce.gov.br/avaliacao/servico/login/";

  $scope.logar = function(){
   var dados = {"login":$scope.login,"senha":$scope.senha}
   dados = JSON.stringify(dados);
   if (!$scope.login || !$scope.senha) {
     swal("Preencha todos os valores!","x", "error"); 
   }else{
     $http.post(url_gestor,dados).success(function(data, status, headers, config) { 
      console.log(data);
       localStorage.setItem("id", (data["id"]));
       localStorage.setItem("nome", (data["nome"]));
       localStorage.setItem("login", (data["login"]));
       window.location = 'index.html';
     }).error(function(data, status, headers, config) {
       setTimeout(function(){
         swal("Usuário não encontrado!","", "error");
       });
     }, 1000); 
   }
  }

}]);

var inicio_mod = angular.module('gestor', []);


inicio_mod.directive('cadUsuario', function(){
  // Runs during compile
  return {
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'templates/cadUsuario.html',
     replace: true,
  };
});

inicio_mod.directive('menuCrud', function(){
 return {
  restrict: 'E',
  templateUrl: 'templates/menuCrud.html',
  replace: true
 };
});

inicio_mod.directive('headerLeft', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/headerLeft.html',    
    }
});

inicio_mod.directive('headerMenu', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/headerMenu.html',
        scope: {
        	usuario : '@'
        }  
    }
});

inicio_mod.directive('footerSesa', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/footer.html',
    }
});

inicio_mod.directive('alteraSenha', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/alteraSenha.html',
    }
});

inicio_mod.directive('tituloSistema', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/tituloSistema.html',
    }
});

inicio_mod.directive('ondeEstou', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/ondeEstou.html',
        scope: {
        	pagina : '@',
        	subpagina : '@',
        	icone : '@'
        }  
    }
});


inicio_mod.controller('altSenhaCtrl', ['$scope', '$http', function($scope, $http){
	$scope.limpar = function(){
		if($scope.alteracao) {
			$scope.alteracao.senha = "";
			$scope.alteracao.novasenha = "";
			$scope.alteracao.confirmnovasenha = "";
		}

		
		$scope.formAltSenha.$setPristine();
	}	

  $scope.alterar = function() {

    var id = localStorage.getItem('id');
    var login = localStorage.getItem('login');
    var senha = $scope.alteracao.senha;
    var novaSenha = $scope.alteracao.novasenha;

    var jsonObj = JSON.stringify({"id": id,"senha": senha, "senhaNova": novaSenha});
    $http.post('http://172.29.2.30:8087/gestorws/webresources/alterarsenha', jsonObj)
      .success(function(data, status, headers, config) {
          swal('Senha Alterada com sucesso',   '',   'success' );
          $scope.limpar();
        })
      .error(function(data, status, headers, config) {
          swal(data[0].mensagemErro,   '',   'error' );
          $scope.limpar();
      });

      return true;
  };

}]);


inicio_mod.controller('cadUsuarioCtrl', ['$scope', '$http', function($scope, $http){
  $scope.tab = 0;
  $scope.carregando = false;
  $scope.showFields = false; 

 $scope.setTab = function (i){
    $scope.tab = i;    
  };

  $scope.isSetTab = function (i) {
    return $scope.tab === i;
  };

  $scope.openModal = function(){
    $scope.usuario = {};
    $scope.tab = 0;
    $scope.showFields = false;
    selectedPerson = {};
    $scope.formCadUsuarioI.$setPristine();
    $scope.formCadUsuario.$setPristine();
    $("#ex1_value").val("");
  };

  $scope.requestByName = function(name) {
    $http.get('http://172.29.0.30:8087/gestorws/webresources/usuario/'+name)
    .success(function(data, status, headers, config) {
        $scope.carregando = false;
        $scope.servidores = data;
      })
    .error(function(data, status, headers, config) {
        alert("Erro na Requisicao" + status);
    });
  };

  $scope.requestByEnrollment = function(number) {
    $http.get('http://172.29.0.30:8087/gestorws/webresources/usuario/1/'+number)
    .success(function(data, status, headers, config) {
        $scope.carregando = false;
        $scope.usuario = data;
        $scope.usuario.senha = "saude123";
        $scope.showFields = true;
      })
    .error(function(data, status, headers, config) {
        $scope.carregando = false;
        alert("Matrícula Inválida");
    });
  };

  $scope.gerar = function() {
    console.log($scope.usuario.nome);
    console.log($scope.usuario.login);
    console.log($scope.usuario.email);
    console.log($scope.usuario.senha);
    console.log($scope.usuario.cpf);
  }

  $scope.cadastrar = function (){
    //USAR E-MAIL EM MINÚSCULO
    var email = $scope.usuario.email;
    console.log(email);
    console.log($scope.usuario.nome);
    console.log($scope.usuario.login);
    console.log(email.toString.toLowerCase());
    console.log($scope.usuario.senha);
    console.log($scope.usuario.cpf);
  }

  $scope.validaCpf = function (strCPF) { 
    var Soma; 
    var Resto; Soma = 0; 
    if(strCPF) {
      if (strCPF == "00000000000") return false; 
      for (i=1; i<=9; i++) 
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); Resto = (Soma * 10) % 11; 
      if ((Resto == 10) || (Resto == 11)) 
        Resto = 0; 
      if (Resto != parseInt(strCPF.substring(9, 10)) ) 
        return false; 
      Soma = 0; 
      for (i = 1; i <= 10; i++) 
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i); 
      Resto = (Soma * 10) % 11; 
      if ((Resto == 10) || (Resto == 11)) 
        Resto = 0; 
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) 
        return false; 
      return true; 
    } else {
      return false;
    }
  }


  $scope.selectedPerson = function(selectedPerson) {
    if (selectedPerson) {
      $scope.showFields = true;
      $scope.usuario.usuario = selectedPerson.originalObject.usuario;
      $scope.usuario.matricula = String(selectedPerson.originalObject.matricula);
      $scope.usuario.nome = selectedPerson.originalObject.nome;
      $scope.usuario.cpf = selectedPerson.originalObject.cpf;
      $scope.usuario.senha = "saude123";
    } else {
      console.log('cleared');
    }
  };

  $scope.inputChanged = function(str) {
    if (str.length == 4) {
      $scope.carregando = true;
      $scope.requestByName(str);
    }
  };

  $scope.busca = function(){
    if ($scope.usuario.matricula.length == 8) {
      $scope.carregando = true;
      $scope.requestByEnrollment($scope.usuario.matricula);
    } else {
      $scope.carregando = false;
    }
  }

  $scope.focusIn = function() {
    
    
  };

  $scope.focusOut = function() {
    
  };   
}]);


inicio_mod.controller('meu_controller', ['$scope', '$http', function($scope, $http){
	var url_usuario = "http://172.29.2.230:8080/gestorws/webresources/usuario/";

	$scope.menus =  [ 
					  {
					    "nome" : "Início",
					    "icone" : "clip-home-3",
					    "link" : "index.html",
					  },
					  {
					    "nome" : "Usuários",
					    "icone" : "clip-users",
 					    "link" : "usuarios.html",
					  }
					];
					

		$scope.titulo = "Gestor";
		$scope.subtitulo = "Sistema Gestor de Usuários";
		
		$scope.user = function(){
			return localStorage.getItem('nome');
		}

    $scope.sair = function(){
      alert("teste");
      console.log("saiu!");
    }

		$scope.usuarios = [];
}]);