(function() {
'use strict';

    angular
        .module('app')
        .controller('RelatoriosController', RelatoriosController);

    RelatoriosController.$inject = ['$scope'];
    function RelatoriosController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();