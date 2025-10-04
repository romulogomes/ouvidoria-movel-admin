(function() {
    'use strict';

    angular
        .module('app')
        .factory('ReclamacoesService', ReclamacoesService);

    ReclamacoesService.$inject = ['$http', '$q', '$location', '$rootScope', 'API_CONFIG'];

    function ReclamacoesService($http, $q, $location, $rootScope, API_CONFIG) {

        var service = {
            getReclamacoes:         getReclamacoes,
            getReclamacao:          getReclamacao,
            respReclamacao:         respReclamacao,
            respOcorrencia:         respOcorrencia,
            getRespostas:           getRespostas,
            getReclamacoesUsuario:  getReclamacoesUsuario,
            getUltimasReclamacoes:  getUltimasReclamacoes,
            notificar:              notificar,
            mudaStatus:             mudaStatus,
            getReclamacoesStatus:   getReclamacoesStatus
        };

        return service;

        ////////////////
        function getReclamacoes() {
            return $http.get(API_CONFIG.BASE_URL + '/reclamacoes/all')
                .then(function(response) {
                    if (typeof response == 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function(response) {
                    return $q.reject(response.data);
                })
        }

        function getReclamacoesStatus(status) {
            return $http.get(API_CONFIG.BASE_URL + '/reclamacoes/all?status=' + status)
                .then(function(response) {
                    if (typeof response == 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function(response){
                    return $q.reject(response.data);
                })
        }

        function getReclamacao(id) {
            return $http({
                method: 'GET',
                url: API_CONFIG.BASE_URL + '/reclamacoes/' + id,
                timeout: API_CONFIG.TIMEOUT,
                headers: API_CONFIG.HEADERS
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

        function respReclamacao(reclamacao, resposta) {
            var dados = {
                "descricao": resposta.descricao,
                "reclamacao_id": reclamacao.id || reclamacao.id_reclamacao,
                "administrador_id": 1
            };

            return $http({
                method: 'POST',
                url: API_CONFIG.BASE_URL + '/respostas',
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

        function getRespostas(id){
            return $http({
                method: 'GET',
                url: API_CONFIG.BASE_URL + '/reclamacoes/' + id + '/respostas',
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

        function getReclamacoesUsuario(id_usuario){
            return $http({
                method: 'GET',
                url: API_CONFIG.BASE_URL + '/usuarios/' + id_usuario + '/reclamacoes',
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

        function getUltimasReclamacoes(){
           return $http.get(API_CONFIG.BASE_URL + '/reclamacoes/last')
                .then(function(response) {
                    if (typeof response == 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function(response) {
                    return $q.reject(response.data);
                })
        }

        function notificar(token, id_reclamacao, tipo, resposta){
            var dados = {
                app_id: "ceeeefc6-8488-482d-9eea-07a931aeeebe",
                include_player_ids: [token],
                large_icon:"http://doitsolucoes.com/apps/ouvidoria/img/logo_small.png",
                data: {"id": id_reclamacao, "tipo": tipo},
                contents: {"en": "Nova resposta! Clique para abrir"}
            };

            var url = "https://onesignal.com/api/v1/notifications";

            return $http({
                    method: 'POST',
                    url: url,
                    timeout: 5000,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic NTk0YTUxOGYtNTQ5Ni00NmU1LWIyMmYtMWE5MGFhZmI1NWFm'
                    },
                    data: dados
                })
                .then(function(response){
                    return response.data;
                })
                .catch(function(error){
                    return error;
                });
        }

        function mudaStatus(id, status){
            return $http({
                method: 'PUT',
                url: API_CONFIG.BASE_URL + '/reclamacoes/' + id,
                timeout: API_CONFIG.TIMEOUT,
                headers: API_CONFIG.HEADERS,
                data: {"status": status}
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