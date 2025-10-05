(function() {
'use strict';

    angular
        .module('app')
        .factory('DashboardService', DashboardService);

    DashboardService.$inject = ['$http', '$q', 'API_CONFIG'];
    function DashboardService($http, $q, API_CONFIG) {
        var service = {
            getDashboardData: getDashboardData
        };
        
        return service;

        ////////////////
        function getDashboardData() {
            return $http({
                method: 'GET',
                url: API_CONFIG.BASE_URL + '/dashboard',
                timeout: API_CONFIG.TIMEOUT,
                headers: API_CONFIG.HEADERS
            })
            .then(function(response){
                if (typeof response == 'object'){
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function(response){
                return $q.reject(response.data);
            });
        }
    }
})();