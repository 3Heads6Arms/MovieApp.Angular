angular
    .module('movie')
    .directive('infiniteScroll', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var rootElement = element[0];

                    element.on('scroll', function () {
                        if (rootElement.scrollTop + rootElement.offsetHeight >= rootElement.scrollHeight) {
                            if (!scope.$$phase) {
                                scope.$apply(attrs.infiniteScroll);
                            }
                        }
                    });
                }
            };
        }]);