(function() {
    'use strict';
    
    // Detect environment based on hostname
    function getBaseUrl() {
        var hostname = window.location.hostname;
        
        // If running locally (localhost or 127.0.0.1), use local API
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        
        // For all other environments (production, staging, etc.), use production API
        return 'https://ouvidoria-api-74b0526ccdf6.herokuapp.com';
    }
    
    angular.module('loginApp')
        .constant('API_CONFIG', {
            BASE_URL: getBaseUrl(),
            TIMEOUT: 10000,
            HEADERS: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
})();