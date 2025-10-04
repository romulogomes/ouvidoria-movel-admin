(function() {
'use strict';

    angular
        .module('adminApp')
        .controller('ResponderController', ResponderController);

    ResponderController.inject = ['$scope'];
    function ResponderController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();