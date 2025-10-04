(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReclamacoesController', ReclamacoesController);

    ReclamacoesController.$inject = ['$scope', 'ReclamacoesService', 'UsuariosService', 'Flash'];
    function ReclamacoesController($scope, ReclamacoesService, UsuariosService, Flash) {
        var vm = this;

        $scope.reclamacoes = [];
        $scope.statusList = ['Em Aberto', 'Em Andamento', 'Encerrada', 'Indeferida'];
        $scope.selectedStatus = $scope.statusList[0];

        $scope.getReclamacoes = getReclamacoes;

        $scope.ordenar = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };

        $scope.statusDescriptions = [
            { name: 'Em Aberto', description: 'A ocorrência foi criada pelo cidadão, mas ainda não houve interação com ela por parte da administração' },
            { name: 'Em Andamento', description: 'A ocorrência foi criada pelo cidadão, e a administração a respondeu' },
            { name: 'Encerrada', description: 'A ocorrência foi criada pelo cidadão, a administração já a resolveu e a declarou como Encerrada' },
            { name: 'Indeferida', description: 'A ocorrência foi criada pelo cidadão, mas a administração a julgou inválida' },
        ];
        activate();

        ////////////////

        function activate() {
            getReclamacoes();
        }

        function getReclamacoes() {
            ReclamacoesService.getReclamacoesStatus($scope.selectedStatus)
                .then(function (data) {
                    if (!data.length) {
                        var message = '<i class="clip-info"></i> <strong>Sem registros!</strong> Ainda não há nenhuma reclamação cadastrada, tente novamente mais tarde.';
                        Flash.create('info', message);
                    } else {
                        $scope.reclamacoes = data;
                    }
                }, function (data) {
                    console.log(data);
                });
        }
    }
})();