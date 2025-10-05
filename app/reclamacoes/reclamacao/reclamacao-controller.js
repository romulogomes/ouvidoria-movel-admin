(function() {
'use strict';

    angular
        .module('app')
        .controller('ReclamacaoController', ReclamacaoController);

    ReclamacaoController.$inject = ['$scope', '$routeParams', '$log', '$location', 'ReclamacoesService', 'UsuariosService', 'uiGmapGoogleMapApi', 'Flash'];
    function ReclamacaoController($scope, $routeParams, $log, $location, ReclamacoesService, UsuariosService, uiGmapGoogleMapApi, Flash) {
        
        var vm = this;       
        activate();

        $scope.encerrar = function(reclamacao){
            swal({
                title: 'Encerrar Ocorrência?',
                text: "Deseja realmente encerrar esta ocorrência",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, encerrar!'
            }).then(function () {
                ReclamacoesService.mudaStatus(reclamacao.id, "Encerrada")
                .then(function(data){
                    $scope.reclamacao.status = "Encerrada";
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

        $scope.indeferir = function(reclamacao){
            swal({
                title: 'Encerrar Ocorrência?',
                text: "Deseja realmente encerrar esta ocorrência",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, encerrar!'
            }).then(function () {
                ReclamacoesService.mudaStatus(reclamacao.id, "Indeferida")
                .then(function(data){
                    $scope.reclamacao.status = "Indeferida";
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

        $scope.ordenar = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };
        
        ////////////////

        function activate() { 
            $scope.local = $location.path();
            
            ReclamacoesService.getReclamacao($routeParams.id)
            .then(function(data){
                $scope.reclamacao = data;

                //Lista as respostas da reclamação
                ReclamacoesService.getRespostas($scope.reclamacao.id)
                .then(function(data){
                    $scope.reclamacao.respostas = data;
                    if (!$scope.reclamacao.respostas){
                        var message = '<i class="clip-info"></i> <strong>Sem Resposta!</strong> Ainda não foi enviada nenhuma resposta a essa reclamação, clique em Responder para enviar uma.';
                        Flash.create('warning', message);
                    }
                }, function(data){
                    console.log(data);
                });

                //monta o mapa
                var l = $scope.reclamacao.localizacao;
                l = l.split(",");
                if ($scope.reclamacao.localizacao){
                    $scope.reclamacao.localizacao = {latitude: parseFloat(l[0]), longitude: parseFloat(l[1])};
                    uiGmapGoogleMapApi.then(function (maps) {
                        $scope.map = {center: {latitude: parseFloat(l[0]), longitude: parseFloat(l[1])}, zoom: 18};
                        $scope.options = {scrollwheel: false};
                        $scope.marker = {
                            id: 0,
                            coords: $scope.reclamacao.localizacao,
                            options: { 
                                draggable: false, 
                                icon: 'img/mapicons/'+$scope.reclamacao.categoria_id+'.png', 
                                title: $scope.reclamacao.assunto || 'Localização da Reclamação'
                            }
                        };
                    }).catch(function(error) {
                        console.log('Erro ao carregar Google Maps:', error);
                        var message = '<i class="clip-info"></i> <strong>Erro no Mapa!</strong> Não foi possível carregar o mapa.';
                        Flash.create('warning', message);
                    });
                } else {
                    var message = '<i class="clip-info"></i> <strong>Sem Localização!</strong> O usuário não enviou a localização para esta reclamação.';
                    Flash.create('info', message);
                }

            }, function(data){
                console.log(data);
            });
        }
    }
})();