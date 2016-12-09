namespace movieApp {

    infiniteScrollDirective.$inject = ['$window'];
    function infiniteScrollDirective($window: ng.IWindowService): ng.IDirective {
        let lastCall = new Date(),
            INFINITE_LOADING_DELAY = 500,
            factory: ng.IDirective,
            link: any;

        link = (
            scope: ng.IScope,
            element: JQuery,
            attrs: ng.IAttributes
        ) => {
            let windowElement = angular.element($window);

            windowElement.on('scroll', () => {
                let now = new Date(),
                    loadAvailable = now.valueOf() - lastCall.valueOf() > INFINITE_LOADING_DELAY,
                    delay = loadAvailable ? 0 : 1000;

                if (windowElement.height() + windowElement.scrollTop() >= element.height()) {
                    setTimeout(() => {
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
        }

        return factory;
    }

    angular
        .module('movie')
        .directive('infiniteScroll', infiniteScrollDirective);
}

