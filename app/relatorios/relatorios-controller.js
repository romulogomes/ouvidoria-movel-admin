(function() {
'use strict';

    angular
        .module('adminApp')
        .controller('RelatoriosController', RelatoriosController);

    RelatoriosController.inject = ['$scope'];
    function RelatoriosController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();