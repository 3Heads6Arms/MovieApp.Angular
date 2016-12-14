namespace movieApp {
    class ToolbarComponent implements ng.IComponentOptions {
        templateUrl: string;
        controller: ng.Injectable<ng.IControllerConstructor>;

        constructor() {
            this.templateUrl = 'toolbar/toolbar.template.html';
            this.controller = ToolbarController;
        }
    }

    class ToolbarController implements ng.IComponentController {
        searchValue: string;

        static $inject = ['searchHub'];
        constructor(private searchHub) { }

        searchValueChange(): void {
            this.searchHub.invoke(this.searchValue);
        }
    }

    angular
        .module('movie.toolbar')
        .component('toolbar', new ToolbarComponent());
}