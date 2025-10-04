(function() {
'use strict';

    angular
        .module('app')
        .controller('ResponderController', ResponderController);

    ResponderController.$inject = ['$scope', '$location', '$routeParams', 'ReclamacoesService', 'AlertService'];
    function ResponderController($scope, $location, $routeParams, ReclamacoesService, AlertService) {
        var vm = this;
        
        $scope.enviarResposta = function(resposta){
            ReclamacoesService.respReclamacao($scope.reclamacao, resposta)
            .then(function(data){
                if ($scope.reclamacao.status == "Em Aberto"){
                    ReclamacoesService.mudaStatus($scope.reclamacao.id_reclamacao, "Em Andamento");
                }
                swal({
                    title: 'Resposta enviada!',
                    text: 'Sua resposta foi enviada para o usuário',
                    type: 'success',
                    confirmButtonText: 'Ok'
                }).then(function(){
                    var l = "#/reclamacoes/reclamacao/"+$routeParams.id;
                    location.href = l;
                });
            }, function(data){
                AlertService.showAlert({
                    title: 'Erro!',
                    text: 'Houve um erro no envio da resposta',
                    type: 'error',
                    confirmButtonText: 'Ok'
                });
                console.log(data);
            });

            if (resposta.notificar){
                ReclamacoesService.notificar($scope.reclamacao.token_cel, $scope.reclamacao.id_reclamacao, 4, resposta.descricao)
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
            $scope.resposta = {};
            $scope.reclamacao = ReclamacoesService.getReclamacao($routeParams.id)
            .then(function(data){
                $scope.reclamacao = data;
            }, function(data){
                console.log(data);
            })
        }
    }
})();