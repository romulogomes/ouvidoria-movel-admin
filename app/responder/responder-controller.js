(function() {
'use strict';

    angular
        .module('app')
        .controller('ResponderController', ResponderController);

    ResponderController.$inject = ['$scope'];
    function ResponderController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();