import { DiscoverService } from './../services/DiscoverService';

namespace movieApp {
    angular
        .module('movie.services', [])
        .factory('discover', DiscoverService);
}