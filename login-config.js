(function() {
    'use strict';
    
    angular.module('loginApp')
        .constant('API_CONFIG', {
            BASE_URL: 'http://localhost:3000',
            TIMEOUT: 10000,
            HEADERS: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
})();