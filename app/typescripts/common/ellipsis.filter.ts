angular
    .module('movie')
    .filter('ellipsis', [
        function () {

            return function (input, length) {
                var index,
                    output;
                input = input || '';
                length = length || 100;


                if (typeof (input) !== "string") {
                    throw new Error('Ellipsis filter can be applied only on strings');
                }

                output = input.substr(0, length);
                if (input.length > length) {
                    index = output.lastIndexOf(' ');
                    output = output.substring(0, index) + ' ...';
                }

                return output;
            };
        }
    ]);