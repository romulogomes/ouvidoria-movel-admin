(function () {
    'use strict';

    angular
        .module('app')
        .controller('SugestoesController', SugestoesController);

    SugestoesController.$inject = ['$scope', 'OcorrenciasService'];
    function SugestoesController($scope, OcorrenciasService) {
        var vm = this;

        $scope.statusList = ['Todos', 'Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.sugestoes = [];

        $scope.getOcorrencias = getOcorrencias;
        
        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            var serviceCall = $scope.selectedStatus === 'Todos' ? 
                OcorrenciasService.getByType(1) : 
                OcorrenciasService.getByTypeStatus(1, $scope.selectedStatus);
                
            serviceCall.then(function (data) {
                $scope.sugestoes = data;
            }, function (data) {
                console.log(data);
            });
        }
    }
})();