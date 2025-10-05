(function () {
    'use strict';

    angular
        .module('app')
        .controller('ElogiosController', ElogiosController);

    ElogiosController.$inject = ['$scope', 'OcorrenciasService'];
    function ElogiosController($scope, OcorrenciasService) {
        var vm = this;

        $scope.statusList = ['Todos', 'Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.elogios = [];

        $scope.getOcorrencias = getOcorrencias;

        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            var serviceCall = $scope.selectedStatus === 'Todos' ? 
                OcorrenciasService.getByType(5) : 
                OcorrenciasService.getByTypeStatus(5, $scope.selectedStatus);
                
            serviceCall.then(function (data) {
                $scope.elogios = data;
            }, function (data) {
                console.log(data);
            });
        }
    }
})();