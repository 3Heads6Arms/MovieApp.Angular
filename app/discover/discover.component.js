angular
    .module('movie.discover')
    .component('discover', {
        templateUrl: 'discover/discover.template.html',
        controller: [
            'discover',
            function (discover) {
                var self = this; 
                discover.discoverMovies()
                    .then(function (movies) {
                        self.movies = movies;
                    })
            }
        ]
    })