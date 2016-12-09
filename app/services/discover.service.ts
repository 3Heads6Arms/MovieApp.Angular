namespace movieApp {
    discoverService.$inject = [
        '$http',
        '$q',
        'SERVER_URL',
        'IMAGE_SERVER_URL',
        'API_KEY',
        'IMAGE_SIZES'];
    function discoverService($http: ng.IHttpService, $q: ng.IQService, SERVER_URL: string, IMAGE_SERVER_URL: string, API_KEY: string, IMAGE_SIZES: any) {
        function discoverMovies(pageNumber: number) {
            let url = SERVER_URL + 'discover/movie' + '?api_key=' + API_KEY + '&page=' + pageNumber;
            let deferred = $q.defer();

            $http.get(url)
                .then(response => {
                    let movies = response.data['results'];

                    getMovieGeneres()
                        .then(genres => {
                            movies.forEach(movie => {
                                let movieGenres = genres.filter(genre => movie.genre_ids.some(genreId => genreId == genre.id));
                                movie.genres = movieGenres;
                                movie.poster_path = IMAGE_SERVER_URL + IMAGE_SIZES.poster.w342 + movie.poster_path;
                            });

                            deferred.resolve(movies);
                        })
                        .catch(error => deferred.reject(error));
                })
                .catch(error => deferred.reject(error));

            return deferred.promise;
        }

        function getMovieGeneres(): ng.IPromise<any[]> {
            let url = SERVER_URL + 'genre/movie/list' + '?api_key=' + API_KEY;
            let deferred = $q.defer<any[]>();

            $http.get(url)
                .then(response => deferred.resolve(response.data['genres']))
                .catch(error => deferred.reject(error));

            return deferred.promise;
        }

        return {
            discoverMovies: discoverMovies
        }
    }

    angular
        .module('movie.services')
        .factory('discoverService', discoverService);
}