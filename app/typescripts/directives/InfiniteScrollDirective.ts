export class InfiniteScrollDirective implements ng.IDirective {
    static $inject: string[] = ['$window'];
    private lastCall: Date;
    private INFINITE_LOADING_DELAY: number;
    restrict: string;

    constructor(private $window) {
        this.lastCall = new Date();
        this.INFINITE_LOADING_DELAY = 500;
    }


    somefunc(...args: any[]): ng.IDirective | ng.IDirectiveLinkFn {
        return null;
    }

    link(scope, element, attrs): ng.IDirective | ng.IDirectiveLinkFn {
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

        return null;
    }
}

