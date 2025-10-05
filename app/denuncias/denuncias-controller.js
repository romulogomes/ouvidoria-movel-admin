(function () {
    'use strict';

    angular
        .module('app')
        .controller('DenunciasController', DenunciasController);

    DenunciasController.$inject = ['$scope', 'OcorrenciasService'];
    function DenunciasController($scope, OcorrenciasService) {
        var vm = this;

        $scope.statusList = ['Todos', 'Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.denuncias = [];

        $scope.getOcorrencias = getOcorrencias;

        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            var serviceCall = $scope.selectedStatus === 'Todos' ? 
                OcorrenciasService.getByType(3) : 
                OcorrenciasService.getByTypeStatus(3, $scope.selectedStatus);
                
            serviceCall.then(function (data) {
                $scope.denuncias = data;
            }, function (data) {
                console.log(data);
            });
        }
    }
})();