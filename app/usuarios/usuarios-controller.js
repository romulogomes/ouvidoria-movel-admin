(function() {
'use strict';

    angular
        .module('adminApp')
        .controller('UsuariosController', UsuariosController);

    UsuariosController.inject = ['$scope', '$http', 'UsuariosService'];
    function UsuariosController($scope, $http, UsuariosService) {
        var vm = this;
        
        $scope.ordenar = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };

        activate();

        ////////////////

        function activate() { 
            UsuariosService.getUsuarios()
                .then(function(data){
                    if (!data.length){
                        var message = '<i class="clip-info"></i> <strong>Sem registros!</strong> Ainda não há nenhum usuário cadastrado, tente novamente mais tarde.';
                        Flash.create('info', message);
                    } else {
                        $scope.usuarios = data;
                    }
                }, function(data){
                    console.log(data);
                })
        }
    }
})();