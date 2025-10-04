(function () {
    'use strict';

    angular
        .module('app')
        .controller('SugestoesController', SugestoesController);

    SugestoesController.$inject = ['$scope', 'OcorrenciasService'];
    function SugestoesController($scope, OcorrenciasService) {
        var vm = this;

        $scope.statusList = ['Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.sugestoes = [];

        $scope.getOcorrencias = getOcorrencias;
        
        activate();

        ////////////////

        function activate() {
            getOcorrencias();
        }

        function getOcorrencias() {
            OcorrenciasService.getByTypeStatus(1, $scope.selectedStatus)
                .then(function (data) {
                    $scope.sugestoes = data;
                }, function (data) {
                    console.log(data);
                });
        }
    }
})();