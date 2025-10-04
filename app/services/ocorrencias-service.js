(function() {
'use strict';

    angular
        .module('app')
        .factory('OcorrenciasService', OcorrenciasService);

    OcorrenciasService.$inject = ['$http', '$q', 'API_CONFIG'];
    function OcorrenciasService($http, $q, API_CONFIG) {
        var service = {
            getByType:              getByType,
            getByTypeStatus:        getByTypeStatus,
            getOcorrencia:          getOcorrencia,
            getRespostasOcorrencia: getRespostasOcorrencia,
            getOcorrenciasUsuario:  getOcorrenciasUsuario,
            respOcorrencia:         respOcorrencia,
            mudaStatus:             mudaStatus
        };
        
        return service;

        ////////////////
        function getByType(id) { 
            var url = API_CONFIG.BASE_URL + '/ocorrencias/all?tipo=' + id;
            return $http({
                method: 'GET',
                url: url,
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

        function getByTypeStatus(id, status) {
            var url = API_CONFIG.BASE_URL + '/ocorrencias/all?tipo=' + id + '&status=' + status;
            return $http({
                method: 'GET',
                url: url,
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

        function getOcorrencia(id){
            var url = API_CONFIG.BASE_URL + '/ocorrencias/' + id;
            return $http({
                method: 'GET',
                url: url,
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

        function getRespostasOcorrencia(id){
            var url = API_CONFIG.BASE_URL + '/ocorrencias/' + id + '/respostas_ocorrencia';
            return $http({
                method: 'GET',
                url: url,
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

        function getOcorrenciasUsuario(id_tipo, id_usuario){
            var url = API_CONFIG.BASE_URL + '/usuarios/' + id_usuario + '/ocorrencias?tipo=' + id_tipo;
            return $http({
                method: 'GET',
                url: url,
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
        
        function respOcorrencia(ocorrencia, resposta) {
            var dados = {
                "descricao": resposta.descricao,
                "ocorrencia_id": ocorrencia.id || ocorrencia.id_ocorrencia,
                "administrador_id": 1
            };

            return $http({
                method: 'POST',
                url: API_CONFIG.BASE_URL + '/respostas_ocorrencia',
                timeout: API_CONFIG.TIMEOUT,
                headers: API_CONFIG.HEADERS,
                data: dados
            }).then(function successCallback(response) {
                if (typeof response == 'object'){
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function errorCallback(response) {
                return $q.reject(response.data);
            });
        }

        function mudaStatus(id, status){
            var dados = {"status": status};
            return $http({
                method: 'PUT',
                url: API_CONFIG.BASE_URL + '/ocorrencias/' + id,
                timeout: API_CONFIG.TIMEOUT,
                headers: API_CONFIG.HEADERS,
                data: dados
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