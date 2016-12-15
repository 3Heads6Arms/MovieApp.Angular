namespace movieApp {
    class SearchService {
        static $inject = ['$http', '$q', 'SERVER_URL', 'API_KEY', 'IMAGE_SERVER_URL', 'IMAGE_SIZES'];
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private SERVER_URL: string,
            private API_KEY: string,
            private IMAGE_SERVER_URL: string,
            private IMAGE_SIZES) { }

        searchMovies(query: string): ng.IPromise<any> {
            let deferred = this.$q.defer(),
                url = this.SERVER_URL + 'search/movie?api_key=' + this.API_KEY + '&query=' + query;

            this.$http.get(url)
                .then(response => {
                    let movies = response.data['results'];

                    this.getMovieGeneres()
                        .then(genres => {
                            movies.forEach(movie => {
                                let movieGenres = genres.filter(genre => movie.genre_ids.some(genreId => genreId == genre.id));
                                movie.genres = movieGenres;
                                movie.poster_path = this.IMAGE_SERVER_URL + this.IMAGE_SIZES.poster.w342 + movie.poster_path;
                            });

                            deferred.resolve(movies);
                        })
                        .catch(error => deferred.reject(error));
                })
                .catch(error => deferred.reject(error));

            return deferred.promise;
        }

        searchTvShows(query: string) {
            let deferred = this.$q.defer(),
                url = this.SERVER_URL + 'search/tv?api_key=' + this.API_KEY + '&query=' + query;

            this.$http.get(url)
                .then(response => deferred.resolve(response.data))
                .catch(error => deferred.reject(error));

            return deferred.promise;
        }


        getMovieGeneres(): ng.IPromise<any[]> {
            let url = this.SERVER_URL + 'genre/movie/list' + '?api_key=' + this.API_KEY;
            let deferred = this.$q.defer<any[]>();

            this.$http.get(url)
                .then(response => deferred.resolve(response.data['genres']))
                .catch(error => deferred.reject(error));

            return deferred.promise;
        }
    }
    angular
        .module('movie.services')
        .service('searchService', SearchService);
}