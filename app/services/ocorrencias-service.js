(function() {
'use strict';

    angular
        .module('adminApp')
        .factory('OcorrenciasService', OcorrenciasService);

    OcorrenciasService.inject = ['$http'];
    function OcorrenciasService($http) {
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
            var url = 'http://www.doitsolucoes.com/apps/ouvidoria/ocorrencias_tipo.php';
            var dados = {"tipo": id};
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

        function getByTypeStatus(id, status) {
            var url = 'http://www.doitsolucoes.com/apps/ouvidoria/ocorrencias_tipo_status.php';
            var dados = {"tipo": id, "status": status};
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

        function getOcorrencia(id){
            var url = "http://www.doitsolucoes.com/apps/ouvidoria/get_ocorrencia.php";
            var dados = {"id_ocorrencia": id};
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

        function getRespostasOcorrencia(id){
            var url = "http://doitsolucoes.com/apps/ouvidoria/lista_respostas_ocorrencia.php";
            var dados = {"ocorrencia": id};
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

        function getOcorrenciasUsuario(id_tipo, id_usuario){
            var url = "http://www.doitsolucoes.com/apps/ouvidoria/lista_ocorrencia.php";
            var dados = {"usuario": id_usuario, "tipo": id_tipo};
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
        
        function respOcorrencia(ocorrencia, resposta) {
            var dados = {
                "descricao": resposta.descricao,
                "ocorrencia": ocorrencia.id_ocorrencia,
                "admin_fk": 1,
            };

            return $http({
                method: 'POST',
                url: 'http://www.doitsolucoes.com/apps/ouvidoria/cadastra_resposta_ocorrencia.php',
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

        function mudaStatus(id, status){
            var url = "http://www.doitsolucoes.com/apps/ouvidoria/muda_status.php";
            var dados = {"id_ocorrencia": id, "status": status};
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
    }
})();