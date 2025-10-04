(function () {
    'use strict';

    angular
        .module('app')
        .controller('ElogiosController', ElogiosController);

    ElogiosController.$inject = ['$scope', 'OcorrenciasService'];
    function ElogiosController($scope, OcorrenciasService) {
        var vm = this;

        $scope.statusList = ['Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.elogios = [];

        $scope.getOcorrencias = getOcorrencias;

        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            OcorrenciasService.getByTypeStatus(5, $scope.selectedStatus)
                .then(function (data) {
                    $scope.elogios = data;
                }, function (data) {
                    console.log(data);
                });
        }
    }
})();