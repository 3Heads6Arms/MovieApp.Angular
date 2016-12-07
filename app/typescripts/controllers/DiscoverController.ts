import { DiscoverService } from './../services/DiscoverService';

export class DiscoverController {
    static $inject: string[] = ['discover', '$scope']

    currentPageNumber: number;
    movies: any[];
    isLoading: boolean;
    showLoader: boolean;

    // @ngInject
    constructor(private discover: DiscoverService, private $scope) {
        this.currentPageNumber = 0;
        this.movies = [];
        this.isLoading = true;
        this.showLoader = false;

        this.discoverMoreMovies();
    }

    discoverMoreMovies(): void {
        this.discover.discoverMovies(++this.currentPageNumber)
            .then(movies => {
                movies.forEach(movie => this.movies.push(movie))

                this.isLoading = false;
                this.showLoader = true;
            });


    }

}