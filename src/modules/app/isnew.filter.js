angular.module('mainapp')
    .filter('isnew', function () {
        // check if date is within the last five days

        return function (input) {
            var actualDate = new Date();
            var checkDate = new Date(input).setHours(0, 0, 0, 0);

            // substract 5 days
            actualDate = new Date(actualDate.getTime() - 5*24*60*60*1000).setHours(0, 0, 0, 0);

            return (actualDate <= checkDate);
        };
    });