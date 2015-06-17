angular.module('mainapp')
    .directive('scrollTo', function ($location, $anchorScroll) {
        return function(scope, element, attrs) {

            element.bind('click', function(event) {
                event.stopPropagation();
                var off = scope.$on('$locationChangeStart', function(ev) {
                    off();
                    ev.preventDefault();
                });
                var location = attrs.scrollTo;
                $location.hash(location);
                $anchorScroll();
            });

        };
    })
    .directive('onErrorSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src != attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        };
    });