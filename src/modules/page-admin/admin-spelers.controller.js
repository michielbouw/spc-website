angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminSpelersController', ['Api', 'Upload', '$scope', '$modal', '$rootScope', '$location',
        function(Api, Upload, $scope, $modal, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        self.loading = true;

        Api.Spelers.query(function(res) {
            self.spelers = res;
            self.loading = false;
        });

        //self.orderSpelers = 'clubNaam';

        self.new = {};
        self.new.seizoen = 'Seizoen 2015-2016';

        self.spelerAdd = function() {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            Api.Spelers.post({
                spelerID: self.new.spelerID,
                spelerNaam: self.new.spelerNaam,
                seizoen: self.new.seizoen,
                clubNaam: self.new.clubNaam,
                clubID: self.new.clubID,
                editor: editor_name,
                date_edited: self.datetime
            }, function() {
                Api.Spelers.query(function(res) {
                    self.spelers = res;
                });
            }, function() {
            });
        };

        self.spelerSave = function() {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            angular.forEach(self.spelers, function(value, key) {
                Api.Speler.put({
                    _id: value._id
                }, {
                    spelerID: value.spelerID,
                    spelerNaam: value.spelerNaam,
                    spelerGeboorteland: value.spelerGeboorteland,
                    spelerGeboortedatum: value.spelerGeboortedatum,
                    spelerType: value.spelerType,
                    spelerRugnummer: value.spelerRugnummer,
                    spelerPositie: value.spelerPositie,
                    spelerPhoto: value.spelerPhoto,
                    seizoen: value.seizoen,
                    clubNaam: value.clubNaam,
                    clubID: value.clubID,
                    aanvangsdatum: value.aanvangsdatum,
                    afmelddatum: value.afmelddatum,
                    editor: editor_name,
                    date_edited: self.datetime
                }, function() {
                }, function() {
                });
            });
            $location.path('/admin');
        };

        self.uploadPlayers = function (files, index) {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            $rootScope.errorImport = '';
            if (files && files.length) {
                var file = files[0];
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
                        self.spelers[index].spelerPhoto = '/media/players/' + res;

                        Api.Speler.put({
                            _id: self.spelers[index]._id
                        }, {
                            spelerPhoto: self.spelers[index].spelerPhoto,
                            editor: editor_name,
                            date_edited: self.datetime
                        }, function() {
                        }, function() {
                        });
                    })
                    .error(function () {
                        console.log('Something went wrong, could be the file size.');
                        $rootScope.errorImport = 'Something went wrong, could be the file size.';
                    });
                /* jshint ignore:end */
            }
        };

        self.spelerDel = function (i) {
            var _t = self.spelers[i];
            Api.Speler.delete({
                _id: _t._id
            }, function() {
                self.spelers.splice(i, 1);
            }, function() {
            });
        };

        self.openModalDel = function (size, i) {
            var modalInstance = $modal.open({
                templateUrl: 'modalDel.html',
                controller: 'ModalDelInstance',
                size: size,
                resolve: {
                    i: function () {
                        return i;
                    }
                }
            });
            modalInstance.result.then(function (i) {
                self.spelerDel(i);
            }, function () {
                //
            });
        };
    }])
    .controller('ModalDelInstance', function ($scope, $modalInstance, i) {
        $scope.ok = function () {
            $modalInstance.close(i);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });