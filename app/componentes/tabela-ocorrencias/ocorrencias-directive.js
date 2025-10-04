(function() {
    'use strict';

    angular
        .module('adminApp')
        .directive('tabelaOcorrencias', tabelaOcorrencias);

    tabelaOcorrencias.inject = [''];
    function tabelaOcorrencias() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            controller: 'TabelaOcorrenciasController',
            replace: true,
            templateUrl: 'app/componentes/tabela-ocorrencias/tabela-ocorrencias.html',
            restrict: 'E',
            scope: {
                ocorrencias: "=ocorrencias",
                tipo:"@tipo",
                status: "=status"
            }
        };
        return directive;
    }
})();

(function() {
'use strict';

    angular
        .module('adminApp')
        .controller('TabelaOcorrenciasController', TabelaOcorrenciasController);

    TabelaOcorrenciasController.inject = ['$scope'];
    function TabelaOcorrenciasController($scope) {
        var vm = this;

        $scope.statusDescriptions = [
            { name: 'Em Aberto', description: 'A ocorrência foi criada pelo cidadão, mas ainda não houve interação com ela por parte da administração' },
            { name: 'Em Andamento', description: 'A ocorrência foi criada pelo cidadão, e a administração a respondeu' },
            { name: 'Encerrada', description: 'A ocorrência foi criada pelo cidadão, a administração já a resolveu e a declarou como Encerrada' },
            { name: 'Indeferida', description: 'A ocorrência foi criada pelo cidadão, mas a administração a julgou inválida' },
        ];
        
        $scope.ordenar = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };

        $scope.getLabelSetor = getLabelSetor;
        activate();

        ////////////////

        function activate() { }

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