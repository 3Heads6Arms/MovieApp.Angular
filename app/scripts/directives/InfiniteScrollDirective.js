"use strict";
var InfiniteScrollDirective = (function () {
    function InfiniteScrollDirective($window) {
        this.$window = $window;
        this.lastCall = new Date();
        this.INFINITE_LOADING_DELAY = 500;
    }
    InfiniteScrollDirective.prototype.somefunc = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return null;
    };
    InfiniteScrollDirective.prototype.link = function (scope, element, attrs) {
        var windowElement = angular.element(this.$window);
        var self = this;
        windowElement.on('scroll', function () {
            var now = new Date();
            var loadAvailable = now.valueOf() - self.lastCall.valueOf() > self.INFINITE_LOADING_DELAY;
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
    };
    InfiniteScrollDirective.$inject = ['$window'];
    return InfiniteScrollDirective;
}());
exports.InfiniteScrollDirective = InfiniteScrollDirective;
//# sourceMappingURL=InfiniteScrollDirective.js.map