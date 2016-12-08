angular
    .module('movie.services')
    .factory('discover', [
    '$http',
    '$q',
    'SERVER_URL',
    'IMAGE_SERVER_URL',
    'API_KEY',
    'IMAGE_SIZES',
    function ($http, $q, SERVER_URL, IMAGE_SERVER_URL, API_KEY, IMAGE_SIZES) {
        function discoverMovies(pageNumber) {
            var url = SERVER_URL + 'discover/movie' + '?api_key=' + API_KEY + '&page=' + pageNumber;
            var deferred = $q.defer();
            $http.get(url)
                .then(function (response) {
                var movies = response.data.results;
                getMovieGeneres()
                    .then(function (genres) {
                    movies.forEach(function (movie) {
                        var movieGenres = genres.filter(function (genre) {
                            return movie.genre_ids.some(function (genreId) {
                                return genreId == genre.id;
                            });
                        });
                        movie.genres = movieGenres;
                        movie.poster_path = IMAGE_SERVER_URL + IMAGE_SIZES.poster.w342 + movie.poster_path;
                    });
                    deferred.resolve(movies);
                })
                    .catch(function (error) {
                    deferred.reject(error);
                });
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
        function getMovieGeneres() {
            var url = SERVER_URL + 'genre/movie/list' + '?api_key=' + API_KEY;
            var deferred = $q.defer();
            $http.get(url)
                .then(function (response) {
                deferred.resolve(response.data.genres);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
        return {
            discoverMovies: discoverMovies
        };
    }
]);
//# sourceMappingURL=discover.service.js.map