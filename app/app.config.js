angular
    .module('movie')
    .config([
        '$locationProvider',
        '$routeProvider',
        '$mdThemingProvider',
        function ($locationProvider, $routeProvider, $mdThemingProvider) {
            $locationProvider.hashPrefix('!');

            $mdThemingProvider
                .theme('default')
                .primaryPalette('brown')
                .accentPalette('indigo')
                .dark();
        }]);