var movieApp;
(function (movieApp) {
    var SearchHubService = (function () {
        function SearchHubService() {
            this.subscribers = [];
        }
        SearchHubService.prototype.subscribe = function (callback) {
            this.subscribers.push(callback);
        };
        SearchHubService.prototype.invoke = function (searchValue) {
            console.log(searchValue);
            this.subscribers.forEach(function (callback) { return callback(searchValue); });
        };
        return SearchHubService;
    }());
    angular.module('movie.services')
        .service('searchHub', SearchHubService);
})(movieApp || (movieApp = {}));
//# sourceMappingURL=search-hub.service.js.map