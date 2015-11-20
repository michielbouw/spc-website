angular.module('mainapp.scouting', ['tc.chartjs.new'])
    .config(function($routeProvider)
    {
        $routeProvider
            //.when('/scouting/:team_slug?', {
            //    templateUrl: 	'scouting/views/scouting.html',
            //    access: {
            //        requiredLogin: true,
            //        permission: 'technische-staff'
            //    }
            //})
            .when('/scouting/:team_slug?', {
                templateUrl: 	'scouting/views/scouting-single.html',
                access: {
                    requiredLogin: true,
                    permission: 'technische-staff'
                }
            });
    });