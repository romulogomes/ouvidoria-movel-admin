(function () {
    'use strict';

    angular
        .module('adminApp')
        .controller('AdminController', AdminController);

    AdminController.inject = ['$scope', '$rootScope', '$http', 'breadcrumbs', 'ReclamacoesService'];
    function AdminController($scope, $rootScope, $http, breadcrumbs, ReclamacoesService) {
        var vm = this;

        $scope.breadcrumbs = breadcrumbs;



        $scope.isPage = function (page) {
            if ($scope.breadcrumbs.get()[breadcrumbs.get().length - 1]) {
                if ($scope.breadcrumbs.get()[breadcrumbs.get().length - 1].label == page) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        activate();

        ////////////////

        function activate() {
            $rootScope.status = new Object();

            $rootScope.status["Em Aberto"] = "warning";
            $rootScope.status["Em Andamento"] = "info";
            $rootScope.status["Encerrada"] = "success";
            $rootScope.status["Indeferida"] = "inverse";

            $rootScope.statusDescriptions = [];
            $rootScope.statusDescriptions = [
                { name: 'Em Aberto', description: 'A ocorrência foi criada pelo cidadão, mas ainda não houve interação com ela por parte da administração' },
                { name: 'Em Andamento', description: 'A ocorrência foi criada pelo cidadão, e a administração a respondeu' },
                { name: 'Encerrada', description: 'A ocorrência foi criada pelo cidadão, a administração já a resolveu e a declarou como Encerrada' },
                { name: 'Indeferida', description: 'A ocorrência foi criada pelo cidadão, mas a administração a julgou inválida' },
            ];

            $rootScope.getLabelSetor = getLabelSetor;

            ReclamacoesService.getUltimasReclamacoes()
                .then(function (data) {
                    $scope.ultreclamacoes = data;
                }, function (data) {
                    console.log(data);
                });


        }

        function getLabelSetor(setor) {
            switch (setor) {
                case 'acao_social':
                    return 'Ação Social';
                case 'agricultura':
                    return 'Agricultura';
                case 'educacao':
                    return 'Educação';
                case 'financas':
                    return 'Finanças';
                case 'esporte':
                    return 'Esporte';
                case 'gestao':
                    return 'Gestão';
                case 'infraestrutura':
                    return 'Infraestrutura';
                case 'meio_ambiente':
                    return 'Meio Ambiente';
                case 'saude':
                    return 'Saúde';
                case 'turismo':
                    return 'Turismo';
                default:
                    return setor;
            }
        }
    }
})();