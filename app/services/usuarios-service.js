(function() {
'use strict';

    angular
        .module('app')
        .factory('UsuariosService', UsuariosService);

    UsuariosService.$inject = ['$http', '$q', '$location', 'API_CONFIG'];
    function UsuariosService($http, $q, $location, API_CONFIG) {
        var service = {
            getUsuarios:getUsuarios,
            getUsuario:getUsuario,
            mudaStatusUsuario: mudaStatusUsuario
        };
        
        return service;

        ////////////////
        function getUsuarios() { 
            return $http.get(API_CONFIG.BASE_URL + '/usuarios')
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

        function getUsuario(id){
            return $http({
                method: 'GET',
                url: API_CONFIG.BASE_URL + '/usuarios/' + id,
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

        function mudaStatusUsuario(id, status) {
            return $http({
                method: 'PUT',
                url: API_CONFIG.BASE_URL + '/usuarios/' + id,
                timeout: API_CONFIG.TIMEOUT,
                headers: API_CONFIG.HEADERS,
                data: {"ativo": status}
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