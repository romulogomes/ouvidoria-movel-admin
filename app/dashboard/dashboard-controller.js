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
                    $scope.reclamacoes = data;
                    
                    var i = 0;
                    var markers = [];
                    if (data.length) {
                        data.forEach(function (reclamacao) {
                            if (reclamacao.localizacao) {
                                var l = reclamacao.localizacao.split(',');
                                var marker = {
                                    icon: "img/mapicons/" + reclamacao.categoria_fk + ".png",
                                    id: i,
                                    latitude: l[0],
                                    longitude: l[1],
                                    // shape: shape,
                                    title: reclamacao.categoria,
                                    animation: google.maps.Animation.DROP,
                                    click: function (a, b, c) {
                                        $location.path('/reclamacoes/reclamacao/' + reclamacao.id_reclamacao);
                                    },
                                    events: function (marker, eventName, model) {
                                        console.log(eventName);
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