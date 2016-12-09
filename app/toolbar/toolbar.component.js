var movieApp;
(function (movieApp) {
    var ToolbarComponent = (function () {
        function ToolbarComponent() {
            this.templateUrl = 'toolbar/toolbar.template.html';
        }
        return ToolbarComponent;
    }());
    angular
        .module('movie.toolbar')
        .component('toolbar', new ToolbarComponent());
})(movieApp || (movieApp = {}));
//# sourceMappingURL=toolbar.component.js.map