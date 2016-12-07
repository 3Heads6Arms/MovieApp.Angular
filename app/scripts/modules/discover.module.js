"use strict";
var DiscoverController_1 = require('./../controllers/DiscoverController');
var movieApp;
(function (movieApp) {
    angular
        .module('movie.discover', [])
        .component('discover', {
        templateUrl: 'views/discover.template.html',
        controller: DiscoverController_1.DiscoverController
    });
})(movieApp || (movieApp = {}));
//# sourceMappingURL=discover.module.js.map