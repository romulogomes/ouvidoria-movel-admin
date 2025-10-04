(function() {
'use strict';

    angular
        .module('adminApp')
        .controller('CriticasController', CriticasController);

    CriticasController.inject = ['$scope', 'OcorrenciasService'];
    function CriticasController($scope, OcorrenciasService) {
        var vm = this;
        
        $scope.statusList = ['Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.criticas = [];

        $scope.getOcorrencias = getOcorrencias;
        
        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            OcorrenciasService.getByTypeStatus(1, $scope.selectedStatus)
                .then(function (data) {
                    $scope.criticas = data;
                }, function (data) {
                    console.log(data);
                });
        }
    }
})();