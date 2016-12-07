export class InfiniteScrollDirective implements ng.IDirectiveFactory {
    static $inject: string[] = ['$window'];
    restrict: string;
    private lastCall: Date;
    private INFINITE_LOADING_DELAY: number;

    constructor(private $window) {
        this.lastCall = new Date();
        this.INFINITE_LOADING_DELAY = 500;
    }

    link(scope, element, attrs): void {
        let windowElement = angular.element(this.$window);
        let self = this;

        windowElement.on('scroll', function () {
            let now = new Date();
            let loadAvailable = now.valueOf() - self.lastCall.valueOf() > self.INFINITE_LOADING_DELAY;

            if (windowElement.height() + windowElement.scrollTop() >= element.height()
                && loadAvailable) {
                if (!scope.$$phase && !scope.$ctrl.isLoading) {
                    scope.$ctrl.showLoader = true;
                    scope.$ctrl.isLoading = true;
                    scope.$apply(attrs.infiniteScroll);
                    self.lastCall = now;
                }
            }
        });
    }
}

