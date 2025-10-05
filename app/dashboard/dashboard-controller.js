(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashBoardController', DashBoardController);

    DashBoardController.$inject = ['$scope', '$location', 'ReclamacoesService'];
    function DashBoardController($scope, $location, ReclamacoesService) {
        var vm = this;

        $scope.statusList = ['Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.getReclamacoes = getReclamacoes;

        activate();

        ////////////////

        function activate() {
            getReclamacoes();
        }

        function getReclamacoes() {

            // ReclamacoesService.getReclamacoes()
            ReclamacoesService.getReclamacoesStatus($scope.selectedStatus)
                .then(function (data) {
                    console.log('Dados recebidos:', data);
                    $scope.reclamacoes = data;
                    
                    var i = 0;
                    var markers = [];
                    if (data.length) {
                        data.forEach(function (reclamacao) {
                            if (reclamacao.localizacao && reclamacao.categoria_id) {
                                var l = reclamacao.localizacao.split(',');
                                var reclamacaoId = reclamacao.id; // Usar o ID correto
                                var marker = {
                                    icon: "img/mapicons/" + reclamacao.categoria_id + ".png",
                                    id: i,
                                    latitude: l[0],
                                    longitude: l[1],
                                    title: reclamacao.categoria,
                                    click: function (a, b, c) {
                                        $location.path('/reclamacoes/reclamacao/' + reclamacaoId);
                                    }
                                }
                                console.log('Marcador criado:', marker);
                                markers.push(marker);
                                i++;
                            } else {
                                console.log('Reclamação ignorada - sem localização ou categoria_id:', reclamacao);
                            }
                        }, this);
                        $scope.markers = markers;
                    }
                    console.log('Total de marcadores criados:', markers.length);
                    console.log('Array de marcadores:', markers);

                    $scope.map = {
                        center: {
                            latitude: -3.684696859274778,
                            longitude: -39.585742099021445
                        },
                        zoom: 15,
                        bounds: {
                            northeast: {
                                latitude: -3.675291,
                                longitude: -39.569761
                            },
                            southwest: {
                                latitude: -3.692973,
                                longitude: -39.605404
                            }
                        }
                    };
                    $scope.options = {
                        scrollwheel: false
                    };
                    $scope.randomMarkers = markers;
                    console.log('$scope.randomMarkers definido:', $scope.randomMarkers);
                }, function (data) {
                    console.log(data);
                });
        }

        function changeStatus() {

        }
    }
})();