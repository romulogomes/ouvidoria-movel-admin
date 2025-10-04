(function() {
'use strict';

    angular
        .module('app')
        .controller('DetalhesController', DetalhesController);

    DetalhesController.$inject = ['$scope', '$location', '$routeParams', 'OcorrenciasService', 'UsuariosService'];
    function DetalhesController($scope, $location, $routeParams, OcorrenciasService, UsuariosService) {
        var vm = this;
        
        $scope.encerrar = function(ocorrencia){
            swal({
                title: 'Encerrar Ocorrência?',
                text: "Deseja realmente encerrar esta ocorrência",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, encerrar!'
            }).then(function () {
                OcorrenciasService.mudaStatus(ocorrencia.id_ocorrencia, "Encerrada")
                .then(function(data){
                    $scope.ocorrencia.status = "Encerrada";
                    swal(
                        'Encerrada!',
                        'Esta ocorrência foi encerrada com sucesso!',
                        'success'
                    );
                }, function(error){
                    console.error(error);
                });
            });
            
        };

        $scope.indeferir = function(ocorrencia){
            swal({
                title: 'Encerrar Ocorrência?',
                text: "Deseja realmente encerrar esta ocorrência",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, encerrar!'
            }).then(function () {
                OcorrenciasService.mudaStatus(ocorrencia.id_ocorrencia, "Indeferida")
                .then(function(data){
                    $scope.ocorrencia.status = "Indeferida";
                    swal(
                        'Indeferida!',
                        'Esta ocorrência foi indeferida com sucesso!',
                        'success'
                    );
                }, function(error){
                    console.error(error);
                });
            });
        };

        activate();

        ////////////////

        function activate() {
            $scope.local = $location.path(); 
            OcorrenciasService.getOcorrencia($routeParams.id)
            .then(function(data){
                $scope.ocorrencia = data;
                //pega o usuário da ocorrência
                UsuariosService.getUsuario($scope.ocorrencia.usuario_fk)
                .then(function(data){
                    $scope.ocorrencia.usuario = data;
                }, function(data){
                    console.log(data);
                });

                OcorrenciasService.getRespostasOcorrencia($routeParams.id)
                .then(function(data){
                    $scope.respostas = data;
                }, function(data){
                    console.log(data);
                })
            }, function(data){
                console.log(data);
            })
        }
    }
})();