angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminUploadsController', ['Api', 'Upload', '$filter', '$rootScope', '$location',
        function(Api, Upload, $filter, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        self.matches = [];
        //Api.Matches.query(function(res) {
        //    self.matches = res;
        //});

        var data1 = {
            "matchID": 16435,
            "thuisTeamID": 1527,
            "uitTeamID": 1530,
            "seizoen": "2014-2015 Play-offs",
            "divisie": "Jupiler League",
            "match_info": {
                "wedstrijd": "FC Eindhoven - FC Volendam",
                "eindstand": "1 - 1",
                "ruststand": "0 - 0",
                "speeldag": "dinsdag",
                "datum": "25-05-2015",
                "tijd": "14:30",
                "ronde": 2,
                "scheids": "Dennis Higler"
            },
            extra_uploads: []
        };
        var data2 = {
            "matchID": 16379,
            "thuisTeamID": 1525,
            "uitTeamID": 1524,
            "seizoen": "2014-2015 Play-offs",
            "divisie": "Jupiler League",
            "match_info": {
                "wedstrijd": "De Graafschap - Almere City FC",
                "eindstand": "2 - 1",
                "ruststand": "0 - 0",
                "speeldag": "woensdag",
                "datum": "15-05-2015",
                "tijd": "20:45",
                "ronde": 2,
                "scheids": "Martin van den Kerkhof"
            },
            extra_uploads: []
        };
        self.matches.push(data1);
        self.matches.push(data2);

        self.match = {};

        self.seasonInitFunc = function () {
            self.season_matches = [];
            self.season_matches = $filter('filter')(self.matches, {seizoen: self.season_index}, true);
        };
        self.matchInitFunc = function () {
            self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];
        };

        self.temp = {};

        $rootScope.errorAddUpload = '';
        self.uploadFile = function (files, i) {
            $rootScope.errorAddUpload = '';
            if (files && files.length) {
                var file = files[0];
                Upload.upload({
                    url: 'api/media/extra',
                    method: 'POST',
                    file: file
                })
                    .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log(' progress: ' + progressPercentage + '% ' + evt.config.file.name + '. file size (bytes): ' + evt.config.file.size);
                    })
                    .success(function (res) {
                        console.log('file ' + res + ' uploaded.');
                        if (!i || i === '') {
                            var temp_file = {};
                            temp_file.file = '/media/extra/' + res;
                            temp_file.title = self.temp.title;
                            temp_file.description = self.temp.description;
                            self.match.extra_uploads.push(temp_file);
                        } else {
                            self.match.extra_uploads[i].file = '/media/extra/' + res;
                        }

                        var _t = self.match;
                        //Api.Match.put({
                        //    _id: _t._id
                        //}, {
                        //    ...
                        //    extra_uploads: _t.extra_uploads,
                        //    editor: $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name,
                        //    date_edited: self.datetime
                        //}, function() {
                        //}, function() {
                        //    console.log('Something went wrong.');
                        //});
                    })
                    .error(function () {
                        console.log('Something went wrong, could be the file size.');
                        $rootScope.errorAddUpload = 'Something went wrong, could be the file size.';
                    });
            }
        };

        self.uploadSave = function() {
            var _t = self.match;
            //Api.Match.put({
            //    _id: _t._id
            //}, {
            //    ...
            //    extra_uploads: _t.extra_uploads,
            //    editor: $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name,
            //    date_edited: self.datetime
            //}, function() {
            //    $location.path('/admin');
            //}, function() {
            //    console.log('Something went wrong.');
            //});
        };

        self.uploadDel = function(i) {
            self.match.extra_uploads.splice(i, 1);
        };
    }]);