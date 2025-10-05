(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashBoardController', DashBoardController);

    DashBoardController.$inject = ['$scope', '$location', 'ReclamacoesService'];
    function DashBoardController($scope, $location, ReclamacoesService) {
        var vm = this;

        $scope.statusList = ['Todos', 'Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0]; // "Todos"

        $scope.getReclamacoes = getReclamacoes;

        activate();

        ////////////////

        function activate() {
            getReclamacoes();
        }

        function getReclamacoes() {
            // Se "Todos" estiver selecionado, busca todas as reclamações, senão filtra por status
            var serviceCall = ($scope.selectedStatus === 'Todos') ? 
                ReclamacoesService.getReclamacoes() : 
                ReclamacoesService.getReclamacoesStatus($scope.selectedStatus);
            
            serviceCall
                .then(function (data) {
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
                                markers.push(marker);
                                i++;
                            }
                        }, this);
                        $scope.markers = markers;
                    }

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
                }, function (data) {
                    console.log(data);
                });
        }

        function changeStatus() {

        }
    }
})();