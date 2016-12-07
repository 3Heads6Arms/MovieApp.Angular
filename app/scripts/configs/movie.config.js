"use strict";
var MovieConfig = (function () {
    function MovieConfig($locationProvider, $routeProvider, $mdThemingProvider) {
        $locationProvider.hashPrefix('!');
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('indigo')
            .dark();
        $routeProvider.when('/', {
            template: '<discover></discover>'
        });
    }
    MovieConfig.$inject = [
        '$locationProvider',
        '$routeProvider',
        '$mdThemingProvider'
    ];
    return MovieConfig;
}());
exports.MovieConfig = MovieConfig;
//# sourceMappingURL=movie.config.js.map