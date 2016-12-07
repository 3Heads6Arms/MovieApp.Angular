import { DiscoverController } from './../controllers/DiscoverController';

namespace movieApp {
    angular
        .module('movie.discover', [])
        .component('discover', {
            templateUrl: 'views/discover.template.html',
            controller: DiscoverController
        });
}