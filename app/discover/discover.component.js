angular
    .module('movie.discover')
    .component('discover', {
        templateUrl: 'discover/discover.template.html',
        controller: [
            'discover',
            '$scope',
            function (discover, $scope) {
                var self = this,
                    currentPageNumber = 1;

                discover.discoverMovies(currentPageNumber)
                    .then(function (movies) {
                        self.movies = movies
                    });


                this.discoverMoreMovies = function () {
                    discover.discoverMovies(++currentPageNumber)
                        .then(function (movies) {
                            debugger;
                            self.movies.concat(movies);
                        });
                }
            }
        ]
    })