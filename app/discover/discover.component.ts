namespace movieApp {
    class DiscoverController implements ng.IComponentController {
        currentPageNumber: number;
        movies: any[];
        isLoading: boolean;
        showLoader: boolean;
        onSearch: Function;

        static $inject = ['$scope', 'discoverService', 'searchHub', 'searchService']
        constructor(
            private $scope: ng.IScope,
            private discoverService,
            private searchHub,
            private searchService) {
            this.isLoading = true;
            this.showLoader = false;
            this.currentPageNumber = 0;
            this.movies = [];
            let _self = this;

            this.onSearch = function (value: string) {
                _self.searchService.searchMovies(value)
                    .then(movies => {
                    _self.movies = [];
                    _self.movies = movies;
                    });
            }

            this.discoverMoreMovies();
            this.searchHub.subscribe(this.onSearch);
        }

        discoverMoreMovies(): void {
            this.discoverService.discoverMovies(++this.currentPageNumber)
                .then(movies => {
                    movies.forEach(movie => this.movies.push(movie));
                    this.isLoading = false;
                    this.showLoader = true;
                });
        }
    }

    class DiscoverComponent implements ng.IComponentOptions {
        templateUrl: string;
        controller: ng.Injectable<ng.IControllerConstructor>;

        constructor() {
            this.templateUrl = 'discover/discover.template.html';
            this.controller = DiscoverController;
        }

    }

    angular
        .module('movie.discover')
        .component('discover', new DiscoverComponent());
}