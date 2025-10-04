(function() {
'use strict';

    angular
        .module('adminApp')
        .factory('UsuariosService', UsuariosService);

    UsuariosService.inject = ['$http', '$q', '$location'];
    function UsuariosService($http, $q, $location) {
        var service = {
            getUsuarios:getUsuarios,
            getUsuario:getUsuario,
            mudaStatusUsuario: mudaStatusUsuario
        };
        
        return service;

        ////////////////
        function getUsuarios() { 
            var url = 'http://www.doitsolucoes.com/apps/ouvidoria/lista_usuarios.php';
            return $http.get(url)
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
            var url = 'http://www.doitsolucoes.com/apps/ouvidoria/get_usuario.php';
            var dados = {"id_usuario": id};
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

        function mudaStatusUsuario(id, status) {
            var url = 'http://www.doitsolucoes.com/apps/ouvidoria/muda_status_usuario.php';
            var dados = {"id_usuario": id, "status": status};
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