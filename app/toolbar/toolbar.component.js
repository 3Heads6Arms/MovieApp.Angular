var movieApp;
(function (movieApp) {
    var ToolbarComponent = (function () {
        function ToolbarComponent() {
            this.templateUrl = 'toolbar/toolbar.template.html';
            this.controller = ToolbarController;
        }
        return ToolbarComponent;
    }());
    var ToolbarController = (function () {
        function ToolbarController(searchHub) {
            this.searchHub = searchHub;
        }
        ToolbarController.prototype.searchValueChange = function () {
            this.searchHub.invoke(this.searchValue);
        };
        ToolbarController.$inject = ['searchHub'];
        return ToolbarController;
    }());
    angular
        .module('movie.toolbar')
        .component('toolbar', new ToolbarComponent());
})(movieApp || (movieApp = {}));
//# sourceMappingURL=toolbar.component.js.map