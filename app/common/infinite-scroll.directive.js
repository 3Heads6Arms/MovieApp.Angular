var movieApp;
(function (movieApp) {
    infiniteScrollDirective.$inject = ['$window', '$timeout'];
    function infiniteScrollDirective($window, $timeout) {
        var lastCall = new Date(), INFINITE_LOADING_DELAY = 500, factory, link;
        link = function (scope, element, attrs) {
            var windowElement = angular.element($window);
            windowElement.on('scroll', function () {
                var now = new Date(), loadAvailable = now.valueOf() - lastCall.valueOf() > INFINITE_LOADING_DELAY, delay = loadAvailable ? 0 : 1000;
                if (windowElement.height() + windowElement.scrollTop() >= element.height()) {
                    $timeout(function () {
                        if (!scope.$$phase && !scope['$ctrl'].isLoading) {
                            scope['$ctrl'].showLoader = true;
                            scope['$ctrl'].isLoading = true;
                            scope.$apply(attrs['infiniteScroll']);
                            lastCall = now;
                        }
                    }, delay);
                }
            });
        };
        factory = {
            restrict: 'A',
            link: link
        };
        return factory;
    }
    angular
        .module('movie')
        .directive('infiniteScroll', infiniteScrollDirective);
})(movieApp || (movieApp = {}));
//# sourceMappingURL=infinite-scroll.directive.js.map