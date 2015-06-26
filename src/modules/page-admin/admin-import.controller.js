angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminImportController', ['Api', 'Upload', '$filter', '$rootScope', '$location',
        function(Api, Upload, $filter, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        self.temp = {};

        $rootScope.errorImport = '';
        self.uploadMatch = function (files) {
            $rootScope.errorImport = '';
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'api/media/' + self.temp.matchID,
                        method: 'POST',
                        file: file
                    })
                        /* jshint ignore:start */
                        .progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(' progress: ' + progressPercentage + '% ' + evt.config.file.name + '. file size (bytes): ' + evt.config.file.size);
                        })
                        .success(function (res) {
                            console.log('file ' + res + ' uploaded.');
                            $location.path('/admin');
                        })
                        .error(function () {
                            console.log('Something went wrong, could be the file size.');
                            $rootScope.errorImport = 'Something went wrong, could be the file size.';
                        });
                        /* jshint ignore:end */
                }
            }
        };

        self.uploadPlayers = function (files) {
            $rootScope.errorImport = '';
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'api/media/players',
                        method: 'POST',
                        file: file
                    })
                        /* jshint ignore:start */
                        .progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(' progress: ' + progressPercentage + '% ' + evt.config.file.name + '. file size (bytes): ' + evt.config.file.size);
                        })
                        .success(function (res) {
                            console.log('file ' + res + ' uploaded.');
                            $location.path('/admin');
                        })
                        .error(function () {
                            console.log('Something went wrong, could be the file size.');
                            $rootScope.errorImport = 'Something went wrong, could be the file size.';
                        });
                        /* jshint ignore:end */
                }
            }
        };

    }]);