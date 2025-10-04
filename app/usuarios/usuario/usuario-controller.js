(function() {
'use strict';

    angular
        .module('app')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = ['$scope', '$rootScope', '$routeParams', 'UsuariosService', 'ReclamacoesService', 'OcorrenciasService'];
    function UsuarioController($scope, $rootScope,  $routeParams, UsuariosService, ReclamacoesService, OcorrenciasService) {
        var vm = this;

        $scope.setTab = function(t){
            $scope.active = t;
        }

        $scope.getTab = function(){
            return $scope.active;
        }

        $scope.isActive = function(t){
            return t == $scope.active;
        }

        $scope.desativaUsuario = desativaUsuario;
        $scope.reativaUsuario = reativaUsuario;

        activate();

        ////////////////

        function activate() { 
            $scope.active = 1; //Controle das abas de Ocorrencias 

            UsuariosService.getUsuario($routeParams.id)
                .then(function(data){
                    $scope.usuario = data;
                    //Reclamações do usuário
                    ReclamacoesService.getReclamacoesUsuario(data.id_usuario)
                    .then(function(data){
                        if (Array.isArray(data)){
                            $scope.usuario.reclamacoes = data;
                        } else {
                            $scope.usuario.reclamacoes = [];
                        }
                        
                    }, function(data){
                        console.log(data);
                    });
                    
                    //Sugestões do usuário
                    OcorrenciasService.getOcorrenciasUsuario(1, data.id_usuario)
                    .then(function(data){
                        if (Array.isArray(data)){
                            $scope.usuario.sugestoes = data;
                        } else {
                            $scope.usuario.sugestoes = [];
                        }
                        
                    }, function(data){
                        console.log(data);
                    });

                    //Críticas do usuário
                    OcorrenciasService.getOcorrenciasUsuario(2, data.id_usuario)
                    .then(function(data){
                        if (Array.isArray(data)){
                            $scope.usuario.criticas = data;
                        } else {
                            $scope.usuario.criticas = [];
                        }
                        
                    }, function(data){
                        console.log(data);
                    });

                    //Denúncias do usuário
                    OcorrenciasService.getOcorrenciasUsuario(3, data.id_usuario)
                    .then(function(data){
                        if (Array.isArray(data)){
                            $scope.usuario.denuncias = data;
                        } else {
                            $scope.usuario.denuncias = [];
                        }
                        
                    }, function(data){
                        console.log(data);
                    })
                }, function(data){
                    console.log(data);
                });

            
        }

        function desativaUsuario(userId) {
            swal({
                title: 'Deseja realmente desativar este usuário?',
                text: "O usuário desativado não poderá mais entrar no aplicativo, mas suas reclamações e ocorrências serão mantidas.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, desativar!'
            }).then(function () {
                UsuariosService.mudaStatusUsuario(userId, 0)
                .then(function(data) {
                    $scope.usuario.ativo = '0';
                    swal(
                        'Usuário desativado!',
                        'O usuário foi desativado com sucesso, caso necessário, você pode reativá-lo na tela de usuário.',
                        'success'
                    );
                }, function(error){
                    swal(
                        'Ops',
                        "Aconteceu algo no servidor e não foi possível desativar o usuário, entre em contato com o suporte para entender este problema.",
                        'error'
                    )
                    console.error(error);
                });
            });
        }

        function reativaUsuario(userId) {
            swal({
                title: 'Deseja realmente reativar este usuário?',
                text: "O usuário reativado poderá novamente entrar no aplicativo e registrar reclamações e ocorrências",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, reativar!'
            }).then(function () {
                UsuariosService.mudaStatusUsuario(userId, 1)
                .then(function(data) {
                    $scope.usuario.ativo = '1';
                    swal(
                        'Usuário reativado!',
                        'O usuário foi reativado com sucesso, caso necessário, você pode desativá-lo na tela de usuário.',
                        'success'
                    );
                }, function(error){
                    swal(
                        'Ops',
                        "Aconteceu algo no servidor e não foi possível reativar o usuário, entre em contato com o suporte para entender este problema.",
                        'error'
                    )
                    console.error(error);
                });
            });
        }
    }
})();