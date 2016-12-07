"use strict";
var DiscoverService = (function () {
    function DiscoverService($http, $q, SERVER_URL, IMAGE_SERVER_URL, API_KEY, IMAGE_SIZES) {
        this.$http = $http;
        this.$q = $q;
        this.SERVER_URL = SERVER_URL;
        this.IMAGE_SERVER_URL = IMAGE_SERVER_URL;
        this.API_KEY = API_KEY;
        this.IMAGE_SIZES = IMAGE_SIZES;
    }
    DiscoverService.prototype.discoverMovies = function (pageNumber) {
        var self = this;
        var url = this.SERVER_URL + 'discover/movie' + '?api_key=' + this.API_KEY + '&page=' + pageNumber;
        var deferred = this.$q.defer();
        this.$http.get(url)
            .then(function (response) {
            var movies = response.data.results;
            self.getMovieGenres()
                .then(function (genres) {
                movies.forEach(function (movie) {
                    var movieGenres = genres.filter(function (genre) { return movie.genre_ids.some(function (genreId) { return genreId == genre.id; }); });
                    movie.genres = movieGenres;
                    movie.poster_path = self.IMAGE_SERVER_URL + self.IMAGE_SIZES.poster.w342 + movie.poster_path;
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
    };
    DiscoverService.prototype.getMovieGenres = function () {
        var url = this.SERVER_URL + 'genre/movie/list' + '?api_key=' + this.API_KEY;
        var deferred = this.$q.defer();
        this.$http
            .get(url)
            .then(function (response) { return deferred.resolve(response.data.genres); }, function (error) { return deferred.reject(error); });
        return deferred.promise;
    };
    DiscoverService.$inject = ['$http',
        '$q',
        'SERVER_URL',
        'IMAGE_SERVER_URL',
        'API_KEY',
        'IMAGE_SIZES'];
    return DiscoverService;
}());
exports.DiscoverService = DiscoverService;
//# sourceMappingURL=DiscoverService.js.map