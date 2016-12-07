"use strict";
var DiscoverController = (function () {
    // @ngInject
    function DiscoverController(discover, $scope) {
        this.discover = discover;
        this.$scope = $scope;
        this.currentPageNumber = 0;
        this.movies = [];
        this.isLoading = true;
        this.showLoader = false;
        this.discoverMoreMovies();
    }
    DiscoverController.prototype.discoverMoreMovies = function () {
        var _this = this;
        this.discover.discoverMovies(++this.currentPageNumber)
            .then(function (movies) {
            movies.forEach(function (movie) { return _this.movies.push(movie); });
            _this.isLoading = false;
            _this.showLoader = true;
        });
    };
    DiscoverController.$inject = ['discover', '$scope'];
    return DiscoverController;
}());
exports.DiscoverController = DiscoverController;
//# sourceMappingURL=DiscoverController.js.map