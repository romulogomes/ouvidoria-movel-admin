(function() {
    'use strict';
    
    angular.module('app')
        .constant('API_CONFIG', {
            BASE_URL: 'http://localhost:3000',  // Rails API URL
            TIMEOUT: 10000,
            HEADERS: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
})();