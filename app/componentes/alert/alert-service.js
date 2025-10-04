(function() {
'use strict';

    angular
        .module('alert')
        .factory('AlertService', AlertService);

    AlertService.inject = [''];
    function AlertService() {
        var service = {
            showAlert:showAlert
        };
        
        return service;

        ////////////////
        function showAlert(msgObjct) { 
            swal(msgObjct);
        }
    }
})();