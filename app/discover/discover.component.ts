namespace movieApp {
    class DiscoverController implements ng.IComponentController {
        currentPageNumber: number;
        movies: any[];
        isLoading: boolean;
        showLoader: boolean;

        static $inject = ['$scope', 'discoverService']
        constructor(private $scope: ng.IScope, private discoverService) {
            this.isLoading = true;
            this.showLoader = false;
            this.currentPageNumber = 0;
            this.movies = [];

            this.discoverMoreMovies();
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
        controller: any;

        constructor() {
            this.templateUrl = 'discover/discover.template.html';
            this.controller = DiscoverController;
        }

    }

    angular
        .module('movie.discover')
        .component('discover', new DiscoverComponent());
}