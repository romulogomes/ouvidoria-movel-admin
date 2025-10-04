(function () {
    'use strict';

    angular
        .module('adminApp')
        .controller('DenunciasController', DenunciasController);

    DenunciasController.inject = ['$scope', 'OcorrenciasService'];
    function DenunciasController($scope, OcorrenciasService) {
        var vm = this;

        $scope.statusList = ['Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.denuncias = [];

        $scope.getOcorrencias = getOcorrencias;

        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            OcorrenciasService.getByTypeStatus(3, $scope.selectedStatus)
                .then(function (data) {
                    $scope.denuncias = data;
                }, function (data) {
                    console.log(data);
                });
        }
    }
})();