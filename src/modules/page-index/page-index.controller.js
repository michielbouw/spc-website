angular.module('mainapp.pageIndex')
    .controller('mainapp.pageIndex.IndexController', ['Api',
        function(Api)
    {
        var self = this;

        Api.Pages.query(function(res) {
            self.pages = res[0];
        });
    }]);