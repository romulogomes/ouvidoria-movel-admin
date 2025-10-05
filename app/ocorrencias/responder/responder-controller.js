(function() {
'use strict';

    angular
        .module('app')
        .controller('ResponderOcorrenciaController', ResponderController);

    ResponderController.$inject = ['$scope', '$routeParams', 'OcorrenciasService', 'ReclamacoesService'];
    function ResponderController($scope, $routeParams, OcorrenciasService, ReclamacoesService) {
        var vm = this;

        $scope.enviarResposta = function(resposta){
            
            ReclamacoesService.respOcorrencia($scope.ocorrencia, resposta)
            .then(function(data){
                if ($scope.ocorrencia.status == "Em Aberto"){
                    OcorrenciasService.mudaStatus($scope.ocorrencia.id, "Em Andamento");
                }
                swal({
                    title: 'Resposta enviada!',
                    text: 'Sua resposta foi enviada para o usuário',
                    type: 'success',
                    confirmButtonText: 'Ok'
                }).then(function(){
                    var l = "#/"+$routeParams.tipo+"/detalhes/"+$routeParams.id;
                    location.href = l;
                });
            }, function(data){
                AlertService.showAlert({
                    title: 'Erro!',
                    text: 'Houve um erro no envio da resposta',
                    type: 'error',
                    confirmButtonText: 'Ok'
                });
            });

            if (resposta.notificar){
                ReclamacoesService.notificar($scope.ocorrencia.token_cel, $scope.ocorrencia.id, $scope.ocorrencia.tipo, resposta.descricao)
                .then(function(data){
                    console.log(data);
                })
                .catch(function(error){
                    console.error(error);
                })
            }
        }
        activate();

        ////////////////

        function activate() { 
            var id = $routeParams.id;
            OcorrenciasService.getOcorrencia(id)
            .then(function(data){
                $scope.ocorrencia = data;
            }, function(data){
                console.error(data);
            })
        }
    }
})();