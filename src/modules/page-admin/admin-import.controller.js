angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminImportController', ['Api', 'Upload', '$filter', '$rootScope', '$location',
        function(Api, Upload, $filter, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        self.temp = {};

        $rootScope.errorImport = '';
    }]);