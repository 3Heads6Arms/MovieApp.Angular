var movieApp;
(function (movieApp) {
    var SearchService = (function () {
        function SearchService($http, $q, SERVER_URL, API_KEY, IMAGE_SERVER_URL, IMAGE_SIZES) {
            this.$http = $http;
            this.$q = $q;
            this.SERVER_URL = SERVER_URL;
            this.API_KEY = API_KEY;
            this.IMAGE_SERVER_URL = IMAGE_SERVER_URL;
            this.IMAGE_SIZES = IMAGE_SIZES;
        }
        SearchService.prototype.searchMovies = function (query) {
            var _this = this;
            var deferred = this.$q.defer(), url = this.SERVER_URL + 'search/movie?api_key=' + this.API_KEY + '&query=' + query;
            this.$http.get(url)
                .then(function (response) {
                var movies = response.data['results'];
                _this.getMovieGeneres()
                    .then(function (genres) {
                    movies.forEach(function (movie) {
                        var movieGenres = genres.filter(function (genre) { return movie.genre_ids.some(function (genreId) { return genreId == genre.id; }); });
                        movie.genres = movieGenres;
                        movie.poster_path = _this.IMAGE_SERVER_URL + _this.IMAGE_SIZES.poster.w342 + movie.poster_path;
                    });
                    deferred.resolve(movies);
                })
                    .catch(function (error) { return deferred.reject(error); });
            })
                .catch(function (error) { return deferred.reject(error); });
            return deferred.promise;
        };
        SearchService.prototype.searchTvShows = function (query) {
            var deferred = this.$q.defer(), url = this.SERVER_URL + 'search/tv?api_key=' + this.API_KEY + '&query=' + query;
            this.$http.get(url)
                .then(function (response) { return deferred.resolve(response.data); })
                .catch(function (error) { return deferred.reject(error); });
            return deferred.promise;
        };
        SearchService.prototype.getMovieGeneres = function () {
            var url = this.SERVER_URL + 'genre/movie/list' + '?api_key=' + this.API_KEY;
            var deferred = this.$q.defer();
            this.$http.get(url)
                .then(function (response) { return deferred.resolve(response.data['genres']); })
                .catch(function (error) { return deferred.reject(error); });
            return deferred.promise;
        };
        SearchService.$inject = ['$http', '$q', 'SERVER_URL', 'API_KEY', 'IMAGE_SERVER_URL', 'IMAGE_SIZES'];
        return SearchService;
    }());
    angular
        .module('movie.services')
        .service('searchService', SearchService);
})(movieApp || (movieApp = {}));
//# sourceMappingURL=search.service.js.map