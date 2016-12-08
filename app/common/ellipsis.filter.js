var movieApp;
(function (movieApp) {
    function EllipsisFilter() {
        return function (input, length) {
            var index, output;
            input = input || '';
            length = length || 100;
            output = input.substr(0, length);
            if (input.length > length) {
                index = output.lastIndexOf(' ');
                output = output.substring(0, index) + ' ...';
            }
            return output;
        };
    }
    angular
        .module('movie')
        .filter('ellipsis', EllipsisFilter);
})(movieApp || (movieApp = {}));
//# sourceMappingURL=ellipsis.filter.js.map