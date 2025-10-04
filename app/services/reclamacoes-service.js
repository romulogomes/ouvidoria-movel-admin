(function() {
    'use strict';

    angular
        .module('adminApp')
        .factory('ReclamacoesService', ReclamacoesService);

    ReclamacoesService.inject = ['$http', '$q', '$location', '$rootScope'];

    function ReclamacoesService($http, $q, $location, $rootScope) {

        var urlServer = 'http://www.doitsolucoes.com/apps/ouvidoria/ws/respostas';

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
            return $http.get('http://www.doitsolucoes.com/apps/ouvidoria/lista_reclamacoes.php')
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
            return $http.get('http://www.doitsolucoes.com/apps/ouvidoria/lista_reclamacoes_status.php?status='+status)
            // return $http.get('http://localhost/ouvidoria/ws/reclamacoes/status/' + status)
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
             var dados = {
                "id_reclamacao": id
            };

            return $http({
                method: 'POST',
                url: 'http://www.doitsolucoes.com/apps/ouvidoria/get_reclamacao.php',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
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

        function respReclamacao(reclamacao, resposta) {
            var dados = {
                "descricao": resposta.descricao,
                "reclamacao": reclamacao.id_reclamacao,
                "admin_fk": 1
            };

            return $http({
                method: 'POST',
                url: urlServer,
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json charset=utf-8'
                },
                // transformRequest: function(obj) {
                //     var str = [];
                //     for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     return str.join("&");
                // },
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
                "ocorrencia": ocorrencia.id_ocorrencia,
                "admin_fk": 1
            };

            return $http({
                method: 'POST',
                url: 'http://www.doitsolucoes.com/apps/ouvidoria/ws/respostas_ocorrencias',
                timeout: 5000,
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json charset=utf-8'
                },
                // transformRequest: function(obj) {
                //     var str = [];
                //     for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                //     return str.join("&");
                // },
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
            var url = "http://www.doitsolucoes.com/apps/ouvidoria/lista_respostas.php";
            var dados = {"reclamacao": id};
            
            return $http({
                method: 'POST',
                url: url,
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
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

        function getReclamacoesUsuario(id_usuario){
            var url = "http://www.doitsolucoes.com/apps/ouvidoria/lista_reclamacoes.php";
            var dados = {"id_usuario": id_usuario};
            console.log(dados);

            return $http({
                method: 'POST',
                url: url,
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
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

        function getUltimasReclamacoes(){
           return $http.get('http://www.doitsolucoes.com/apps/ouvidoria/ultimas_reclamacoes.php')
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
            var url = "http://www.doitsolucoes.com/apps/ouvidoria/ws/reclamacoes/" + id + '/mudarstatus';
            // var url = "http://localhost/ouvidoria/ws/reclamacoes/" + id + '/mudarstatus';
            return $http.put(url, {"id_reclamacao": id, "status": status})
            // var url = "http://www.doitsolucoes.com/apps/ouvidoria/muda_status_reclamacao.php";
            // var dados = {"id_reclamacao": id, "status": status};
            // return $http({
            //     method: 'PUT',
            //     url: url,
            //     timeout: 5000,
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     transformRequest: function(obj) {
            //         var str = [];
            //         for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //         return str.join("&");
            //     },
            //     data: dados
            // })
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