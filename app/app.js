(function() {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'ngCookies',
        'angular-loading-bar',
        'angularUtils.directives.dirPagination',
        'ngFlash',
        'ng-breadcrumbs',
        'uiGmapgoogle-maps',
        'moment-picker',
        'alert'
    ])

    .run(run)
    .config(config);

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        
        $rootScope.globals = $cookies.getObject('globals') || {};

        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
        // }

        $rootScope.$on('$locationChangeStart', function(event, next, current){
            var restrictedPage = $.inArray($location.path(), []) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn){
                location.href = 'login.html';
            }
        });
    };

    config.$inject = ['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', 'uiGmapGoogleMapApiProvider'];
    function config($routeProvider, $locationProvider, cfpLoadingBarProvider, uiGmapGoogleMapApiProvider){

        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB8Ly5n8sKH-KBM3CxbYX_ITkDKylApC1w',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        })

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Carregando...</div>';

        $routeProvider
            .when("/", {
                templateUrl:"app/dashboard/dashboard.html",
                controller: 'DashBoardController',
                label: 'Dashboard'
            })
            .when("/sugestoes", {
                templateUrl: 'app/sugestoes/sugestoes.html',
                controller: 'SugestoesController',
                label: 'Sugestões'
            })
            .when("/sugestoes/detalhes/:id", {
                templateUrl: 'app/ocorrencias/detalhes/detalhes.html',
                controller: 'DetalhesController',
                label: 'Detalhes da Sugestão'
            })
            .when("/reclamacoes", {
                templateUrl: 'app/reclamacoes/reclamacoes.html',
                controller: 'ReclamacoesController',
                label: 'Reclamações'
            })
            .when("/reclamacoes/reclamacao/:id", {
                templateUrl: 'app/reclamacoes/reclamacao/reclamacao.html',
                controller: 'ReclamacaoController',
                label: 'Detalhes da Reclamação'
            })
            .when("/reclamacoes/reclamacao/:id/responder", {
                templateUrl: 'app/reclamacoes/reclamacao/responder/responder.html',
                controller: 'ResponderController',
                label: 'Responder Reclamação'
            })
            .when("/criticas", {
                templateUrl: 'app/criticas/criticas.html',
                controller: 'CriticasController',
                label: 'Críticas'
            })
            .when("/criticas/detalhes/:id", {
                templateUrl: 'app/ocorrencias/detalhes/detalhes.html',
                controller: 'DetalhesController',
                label: 'Detalhes da Crítica'
            })
            .when("/elogios", {
                templateUrl: 'app/elogios/elogios.html',
                controller: 'ElogiosController',
                label: 'Elogios'
            })
            .when("/elogios/detalhes/:id", {
                templateUrl: 'app/ocorrencias/detalhes/detalhes.html',
                controller: 'DetalhesController',
                label: 'Detalhes do Elogio'
            })
            .when('/denuncias', {
                templateUrl: 'app/denuncias/denuncias.html',
                controller: 'DenunciasController',
                label: 'Denúncias'
            })
            .when("/denuncias/detalhes/:id", {
                templateUrl: 'app/ocorrencias/detalhes/detalhes.html',
                controller: 'DetalhesController',
                label: 'Detalhes da Denúncia'
            })
            .when("/usuarios", {
                templateUrl: 'app/usuarios/usuarios.html',
                controller: 'UsuariosController',
                label: 'Usuários'
            })
            .when("/usuarios/usuario/:id", {
                templateUrl: 'app/usuarios/usuario/usuario.html',
                controller: 'UsuarioController',
                label: 'Detalhes do Usuário'
            })
            .when('/relatorios', {
                templateUrl: 'app/relatorios/relatorios.html',
                controller: 'RelatoriosController',
                label: 'Relatórios'
            })
            .when("/:tipo/detalhes/:id/responder", {
                templateUrl: 'app/ocorrencias/responder/responder.html',
                controller: 'ResponderOcorrenciaController',
                label: 'Responder'
            })
            .otherwise({redirectTo: '/'});
    };
})();