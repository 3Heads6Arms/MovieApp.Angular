namespace movieApp {
    class ToolbarComponent implements ng.IComponentOptions {
        templateUrl: string;

        constructor() {
            this.templateUrl = 'toolbar/toolbar.template.html';
        }
    }

    angular
        .module('movie.toolbar')
        .component('toolbar', new ToolbarComponent());
}