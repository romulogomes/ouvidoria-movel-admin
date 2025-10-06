(function () {
    'use strict';

    angular
        .module('loginApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$cookies', '$location', 'AuthenticationService', 'FlashService'];
    function LoginController($scope, $cookies, $location, AuthenticationService, FlashService) {
        var vm = this;

        $scope.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login(usuario) {
            // Validação básica
            if (!usuario || !usuario.email || !usuario.senha) {
                alert('Por favor, preencha email e senha.');
                return;
            }

            $scope.loading = true;
            var requestCompleted = false;

            // Timeout para evitar loading infinito
            var timeout = setTimeout(function() {
                if (!requestCompleted) {
                    requestCompleted = true;
                    $scope.$evalAsync(function() {
                        $scope.loading = false;
                    });
                    alert('Timeout: A requisição demorou muito para responder. Verifique sua conexão.');
                }
            }, 15000);

            AuthenticationService.Login(usuario.email, usuario.senha, function(response){
                if (requestCompleted) return; // Evita executar se timeout já executou
                
                requestCompleted = true;
                clearTimeout(timeout);
                
                $scope.$evalAsync(function() {
                    $scope.loading = false;
                    
                    if (response.data && response.data.erro) {
                        alert(response.data.mensagem || 'Usuário ou senha incorreto(s)');
                    } else if (response.data && response.data.id) {
                        var user = response.data;
                        AuthenticationService.SetCredentials(user.id_admin, user.nome, user.nivel, usuario.senha, function(){
                            location.href = 'index.html#/';
                        });
                    } else {
                        alert('Erro na autenticação. Verifique suas credenciais.');
                    }
                });
            });
        };
    }

})();