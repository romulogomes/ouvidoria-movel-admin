(function() {
'use strict';

    angular
        .module('app')
        .controller('CriticasController', CriticasController);

    CriticasController.$inject = ['$scope', 'OcorrenciasService'];
    function CriticasController($scope, OcorrenciasService) {
        var vm = this;
        
        $scope.statusList = ['Todos', 'Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.criticas = [];

        $scope.getOcorrencias = getOcorrencias;
        
        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            var serviceCall = $scope.selectedStatus === 'Todos' ? 
                OcorrenciasService.getByType(2) : 
                OcorrenciasService.getByTypeStatus(2, $scope.selectedStatus);
                
            serviceCall.then(function (data) {
                $scope.criticas = data;
            }, function (data) {
                console.log(data);
            });
        }
    }
})();