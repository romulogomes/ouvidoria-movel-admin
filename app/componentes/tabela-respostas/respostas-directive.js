(function() {
    'use strict';

    angular
        .module('app')
        .directive('tabelaRespostas', tabelaRespostas);

    // tabelaRespostas.$inject = []; // No dependencies needed
    function tabelaRespostas() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            controller: 'TabRespostasController',
            replace: true,
            templateUrl: 'app/componentes/tabela-respostas/tabela-respostas.html',
            restrict: 'E',
            scope: {
                respostas: '=respostas'
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
})();

(function() {
'use strict';

    angular
        .module('app')
        .controller('TabRespostasController', TabRespostasController);

    TabRespostasController.$inject = ['$scope'];
    function TabRespostasController($scope) {
        var vm = this;
         $scope.ordenar = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };

        activate();

        ////////////////

        function activate() { }
    }
})();