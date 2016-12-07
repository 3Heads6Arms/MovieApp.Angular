export class MovieConfig {
    static $inject: string[] = [
        '$locationProvider',
        '$routeProvider',
        '$mdThemingProvider'
    ]

    constructor($locationProvider: ng.ILocationProvider,
        $routeProvider: ng.route.IRouteProvider,
        $mdThemingProvider: ng.material.IThemingProvider) {
        $locationProvider.hashPrefix('!');
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('indigo')
            .dark();

        $routeProvider.when('/', {
            template: '<discover></discover>'
        });
    }
}