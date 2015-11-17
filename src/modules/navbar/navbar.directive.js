angular.module('mainapp.navbar')
    .directive('navbar', function($timeout){
        return {
            templateUrl: 'navbar/views/navbar.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });

                        var path = window.location.pathname;
                        path = path.replace(/\/$/, "");
                        path = decodeURIComponent(path);
                        $('.navbar-nav li a').each(function(){
                            var $this = $(this);
                            if($this.attr("href") === path.substring(window.location.href.lastIndexOf("/")+1) || ($this.attr("href") === path.substring(0, $this.attr("href") ? $this.attr("href").length : 0) && $this.attr("href").substring($this.attr("href") ? $this.attr("href").lastIndexOf("/")+1 : 0) !== '')) {
                                if (!$this.closest('li').hasClass('active')) {
                                    $this.closest('li').addClass('active');
                                }
                            }
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('navbarclub', function($timeout){
        return {
            templateUrl: 'navbar/views/navbar-club.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });

                        var path = window.location.pathname;
                        path = path.replace(/\/$/, "");
                        path = decodeURIComponent(path);
                        $('.navbar-nav li a').each(function(){
                            var $this = $(this);
                            if($this.attr("href") === path.substring(window.location.href.lastIndexOf("/")+1) || ($this.attr("href") === path.substring(0, $this.attr("href") ? $this.attr("href").length : 0) && $this.attr("href").substring($this.attr("href") ? $this.attr("href").lastIndexOf("/")+1 : 0) !== '') || ($this.attr("href") === '/analyse' && '/wedstrijd' === path.substring(0, 10) && $this.attr("href").substring($this.attr("href") ? $this.attr("href").lastIndexOf("/")+1 : 0) !== '')) {
                                if (!$this.closest('li').hasClass('active')) {
                                    $this.closest('li').addClass('active');
                                }
                            }
                        });
                    });
                }, 0);
            }
        };
    });
    //.directive('navbar-fan', function($timeout){
    //    return {
    //        templateUrl: 'navbar/views/navbar-fan.html',
    //        link: function(scope, element, attrs) {
    //            $timeout(function () {
    //                angular.element(document).ready(function () {
    //
    //                });
    //            }, 0);
    //        }
    //    };
    //});