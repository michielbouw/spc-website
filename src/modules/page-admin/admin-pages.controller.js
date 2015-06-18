angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminPagesController', ['Api', 'Upload', '$rootScope', '$location',
        function(Api, Upload, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        Api.Pages.query(function(res) {
            self.pages = res[0];
        });

        $rootScope.errorAddFeatured = '';
        self.uploadFeatured = function (page, item, i, files) {
            $rootScope.errorAddFeatured = '';
            if (files && files.length) {
                var file = files[0];
                Upload.upload({
                    url: 'api/media/pages',
                    method: 'POST',
                    file: file
                })
                    .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log(' progress: ' + progressPercentage + '% ' + evt.config.file.name + '. file size (bytes): ' + evt.config.file.size);
                    })
                    .success(function (res) {
                        console.log('file ' + res + ' uploaded.');
                        self.pages[page][item][i].photo = '/media/pages/' + res;
                    })
                    .error(function () {
                        console.log('Something went wrong, could be the file size.');
                        $rootScope.errorAddFeatured = 'Something went wrong, could be the file size.';
                    });
            }
        };

        self.pagesSave = function() {
            var _t = self.pages;

            Api.Page.put({
                _id: _t._id
            }, {
                home: _t.home,
                over: _t.over,
                jupiler: _t.jupiler,
                editor: $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name,
                date_edited: self.datetime
            }, function() {
                $location.path('/admin');
            }, function() {
                console.log('Something went wrong.');
            });
        };

        self.pagesCreate = function() {
            Api.Pages.post({
                home: {},
                over: {},
                jupiler: {},
                editor: $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name,
                date_edited: self.datetime
            }, function() {
                Api.Pages.query(function(res) {
                    self.pages = res[0];
                });
            });
        };

        self.itemAdd = function(page, item) {
            var temp = {};
            self.pages[page][item].push(temp);
        };

        self.itemDel = function(page, item, i) {
            self.pages[page][item].splice(i, 1);
        };
    }]);