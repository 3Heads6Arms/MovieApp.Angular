"use strict";
var DiscoverService_1 = require('./../services/DiscoverService');
var movieApp;
(function (movieApp) {
    angular
        .module('movie.services', [])
        .factory('discover', DiscoverService_1.DiscoverService);
})(movieApp || (movieApp = {}));
//# sourceMappingURL=services.module.js.map