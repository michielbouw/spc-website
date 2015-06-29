angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminMatchesEditController', ['Api', '$scope', '$modal', '$routeParams', '$location', '$rootScope', 'Upload',
        function(Api, $scope, $modal, $routeParams, $location, $rootScope, Upload) {

        var self = this;
        self.datetime = new Date();

        if ($routeParams._id == 'add') {
            self.match = {};
        } else {
            Api.Match.get({
                _id: $routeParams._id
            }, function(res) {
                self.match = res;
            });
        }

        var editor_name;
        if ($rootScope.currentUser.middle_name) {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
        } else {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        }

        self.matchEdit = function() {
            var _t = self.match;
            _t.match_info.logo_thuis = _t.match_info.thuis + '.jpg';
            _t.match_info.logo_uit = _t.match_info.uit + '.jpg';

            Api.Match.put({
                _id: _t._id
            }, {
                thuisTeamID: _t.thuisTeamID,
                thuisTeamSlug: _t.match_info.thuis.trim().toLowerCase().replace(/\s+/g, ''),
                uitTeamID: _t.uitTeamID,
                uitTeamSlug: _t.match_info.uit.trim().toLowerCase().replace(/\s+/g, ''),
                seizoen: _t.seizoen,
                divisie: _t.divisie,
                match_info: _t.match_info,
                extra_uploads: _t.extra_uploads,
                editor: editor_name,
                date_edited: self.datetime
            }, function() {
                $location.path('/admin/matches');
            }, function() {
            });
        };

        $rootScope.errorAddMatch = '';
        self.matchAdd = function() {
            $rootScope.errorAddMatch = '';
            var _t = self.match;
            _t.matchID = Math.random().toString(36).substring(7) + new Date().getTime();
            _t.match_info.logo_thuis = _t.match_info.thuis + '.jpg';
            _t.match_info.logo_uit = _t.match_info.uit + '.jpg';

            Api.Matches.post({
                matchID: _t.matchID,
                thuisTeamID: _t.thuisTeamID,
                thuisTeamSlug: _t.match_info.thuis.trim().toLowerCase().replace(/\s+/g, ''),
                uitTeamID: _t.uitTeamID,
                uitTeamSlug: _t.match_info.uit.trim().toLowerCase().replace(/\s+/g, ''),
                seizoen: _t.seizoen,
                divisie: _t.divisie,
                match_info: _t.match_info,
                extra_uploads: _t.extra_uploads,
                editor: editor_name,
                date_edited: self.datetime
            }, function() {
                $location.path('/admin/matches');
            }, function() {
                $rootScope.errorAddMatch = 'Oeps er ging iets mis, misschien heb je iets verkeerd ingevuld.';
            });
        };

        self.matchDel = function () {
            Api.Match.delete({
                _id: self.user._id
            }, function() {
                $location.path('/admin/matches');
            }, function() {
            });
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
                        _t.match_info.logo_thuis = _t.match_info.thuis + '.jpg';
                        _t.match_info.logo_uit = _t.match_info.uit + '.jpg';
                        Api.Match.put({
                            _id: _t._id
                        }, {
                            matchID: _t.matchID,
                            thuisTeamID: _t.thuisTeamID,
                            thuisTeamSlug: _t.match_info.thuis.trim().toLowerCase().replace(/\s+/g, ''),
                            uitTeamID: _t.uitTeamID,
                            uitTeamSlug: _t.match_info.uit.trim().toLowerCase().replace(/\s+/g, ''),
                            seizoen: _t.seizoen,
                            divisie: _t.divisie,
                            match_info: _t.match_info,
                            extra_uploads: _t.extra_uploads,
                            editor: editor_name,
                            date_edited: self.datetime
                        }, function() {
                        }, function() {
                            console.log('Something went wrong.');
                        });
                    })
                    .error(function () {
                        console.log('Something went wrong, could be the file size.');
                        $rootScope.errorAddUpload = 'Something went wrong, could be the file size.';
                    });
            }
        };

        self.uploadDel = function(i) {
            self.match.extra_uploads.splice(i, 1);
        };

        self.openModalDel = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'modalDel.html',
                controller: 'ModalDelInstance',
                size: size
            });
            modalInstance.result.then(function () {
                self.matchDel();
            }, function () {
                //
            });
        };
    }])
    .controller('ModalDelInstance', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });