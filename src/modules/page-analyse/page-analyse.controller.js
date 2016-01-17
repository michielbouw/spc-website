angular.module('mainapp.pageAnalyse')
    .controller('mainapp.pageAnalyse.AnalyseController', ['Api',
        function(Api)
    {
        var self = this;
        Api.Pages.query(function(res) {
            self.analyse_tekst = res[0].analyse;
        });
    }]);