(function() {
    'use strict';

    function getBaseUrl() {
        var hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        
        // Otherwise, use production API
        return 'https://ouvidoria-api-74b0526ccdf6.herokuapp.com';
    }
    
    angular.module('app')
        .constant('API_CONFIG', {
            BASE_URL: getBaseUrl(),
            TIMEOUT: 10000,
            HEADERS: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
})();