namespace movieApp {
    class InfiniteScrollDirective implements ng.IDirective {

    }

    angular
        .module('movie')
        .directive('infiniteScroll', [
            '$window',
            function ($window) {
                var lastCall = 0,
                    INFINITE_LOADING_DELAY = 500;

                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        var windowElement = angular.element($window);

                        windowElement.on('scroll', function () {
                            var now = new Date(),
                                loadAvailable = now - lastCall > INFINITE_LOADING_DELAY;

                            if (windowElement.height() + windowElement.scrollTop() >= element.height()
                                && loadAvailable) {
                                if (!scope.$$phase && !scope.$ctrl.isLoading) {
                                    scope.$ctrl.showLoader = true;
                                    scope.$ctrl.isLoading = true;
                                    scope.$apply(attrs.infiniteScroll);
                                    lastCall = now;
                                }
                            }
                        });
                    }
                };
            }]);
}

