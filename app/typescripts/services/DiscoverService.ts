
export class DiscoverService {
    static $inject: string[] = ['$http',
        '$q',
        'SERVER_URL',
        'IMAGE_SERVER_URL',
        'API_KEY',
        'IMAGE_SIZES']

    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private SERVER_URL: string,
        private IMAGE_SERVER_URL: string,
        private API_KEY: string,
        private IMAGE_SIZES: any) {
    }

    public discoverMovies(pageNumber: number): ng.IPromise<any> {
        let self = this;
        let url = this.SERVER_URL + 'discover/movie' + '?api_key=' + this.API_KEY + '&page=' + pageNumber;
        let deferred = this.$q.defer();

        this.$http.get<any>(url)
            .then(response => {
                let movies = response.data.results as Array<any>;

                self.getMovieGenres()
                    .then((genres: Array<any>) => {
                        movies.forEach(movie => {
                            let movieGenres = genres.filter(genre => movie.genre_ids.some(genreId => genreId == genre.id));
                            movie.genres = movieGenres;
                            movie.poster_path = self.IMAGE_SERVER_URL + self.IMAGE_SIZES.poster.w342 + movie.poster_path;
                        });

                        deferred.resolve(movies);
                    })
                    .catch(error => {
                        deferred.reject(error);
                    });
            }, error => {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    private getMovieGenres(): ng.IPromise<any> {
        let url = this.SERVER_URL + 'genre/movie/list' + '?api_key=' + this.API_KEY;
        let deferred = this.$q.defer();

        this.$http
            .get<any>(url)
            .then(
            response => deferred.resolve(response.data.genres),
            error => deferred.reject(error)
            );

        return deferred.promise;
    }

}