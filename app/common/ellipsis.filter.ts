namespace movieApp {
    function EllipsisFilter(): Function {
        return (input: string, length: number): string => {
            var index: number,
                output: string;

            input = input || '';
            length = length || 100;

            output = input.substr(0, length);
            if (input.length > length) {
                index = output.lastIndexOf(' ');
                output = output.substring(0, index) + ' ...';
            }

            return output;
        }
    }

    angular
        .module('movie')
        .filter('ellipsis', EllipsisFilter);
}