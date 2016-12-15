namespace movieApp {
    class SearchHubService {
        private subscribers: Function[];
        constructor() {
            this.subscribers = [];
        }

        subscribe(callback: Function): void {
            this.subscribers.push(callback);
        }

        invoke(searchValue: string) {
            this.subscribers.forEach(callback => callback(searchValue));
        }
    }
    
    angular.module('movie.services')
        .service('searchHub', SearchHubService)
}