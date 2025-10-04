(function() {
    'use strict';

    angular
        .module('adminApp')
        .directive('activeLink', activeLink);

    activeLink.inject = ['$location'];
    function activeLink($location) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;
        
        function link(scope, element, attrs) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            console.log(attrs);
            path = path.substring(1); //hack because path does not return including hashbang
            scope.location = location;
            scope.$watch('location.path()', function (newPath) {
            if (path === newPath) {
                element.addClass(clazz);
            } else {
                element.removeClass(clazz);
            }
            });
        }
    }
    /* @ngInject */
    function ControllerController () {
        
    }
})();