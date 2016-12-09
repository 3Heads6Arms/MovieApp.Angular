var movieApp;
(function (movieApp) {
    var DiscoverController = (function () {
        function DiscoverController($scope, discoverService) {
            this.$scope = $scope;
            this.discoverService = discoverService;
            this.isLoading = true;
            this.showLoader = false;
            this.currentPageNumber = 0;
            this.movies = [];
            this.discoverMoreMovies();
        }
        DiscoverController.prototype.discoverMoreMovies = function () {
            var _this = this;
            this.discoverService.discoverMovies(++this.currentPageNumber)
                .then(function (movies) {
                movies.forEach(function (movie) { return _this.movies.push(movie); });
                _this.isLoading = false;
                _this.showLoader = true;
            });
        };
        DiscoverController.$inject = ['$scope', 'discoverService'];
        return DiscoverController;
    }());
    var DiscoverComponent = (function () {
        function DiscoverComponent() {
            this.templateUrl = 'discover/discover.template.html';
            this.controller = DiscoverController;
        }
        return DiscoverComponent;
    }());
    angular
        .module('movie.discover')
        .component('discover', new DiscoverComponent());
})(movieApp || (movieApp = {}));
//# sourceMappingURL=discover.component.js.map