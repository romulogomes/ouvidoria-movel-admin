(function() {
    'use strict';

    angular.module('adminApp', [
        'app',
    ])
    .filter("formatData", formatData);
    function formatData(){
        return function(input){
            if (input){
                var output = moment(input);
                output = output.format('DD/MM/YYYY');
                return output;
            } else {
                return null;
            }
        }
    };
})();