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
            $scope.loading = true;

            AuthenticationService.Login(usuario.email, usuario.senha, function(response){
                if (response.data == 'false'){
                    alert('Usuário ou senha incorreto(s)');
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                    var user = response.data;
                    AuthenticationService.SetCredentials(user.id_admin, user.nome, user.nivel, user.senha, function(){
                        location.href = '../ouvidoria/#/';
                    });
                }
            });

            // TODO: Temporário, alterar autenticação.
            // if (AuthenticationService.entrar(usuario)) {
            //     AuthenticationService.SetCredentials(usuario.id_admin, usuario.nome, usuario.nivel, usuario.senha, function () {
            //         location.href = '../ouvidoria/#/';
            //     });
            // }
        };
    }

})();