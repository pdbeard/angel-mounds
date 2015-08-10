'use strict';

angular.module('angelMounds')
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
//                    'overflow-y':'auto',
                    'height': '20px',
                    'position':'absolute',
                    'top':'100%',
                    'background-color':'#fff',
                    'color': '#000000',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing,
                    '-webkit-transform': 'translateY(-100%)',
                    '-moz-transform': 'translateY(-100%)',
                    '-ms-transform': 'translateY(-100%)',
                    '-o-transform': 'translateY(-100%)',
                    'transform': 'translateY(-100%)'
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            var target, content;
            attrs.expanded = false;
            scope.slideHeight =0;

            element.bind('click', function() {

                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    content.style.border = 0;
                    scope.slideHeight = 100;
                } else {
                    //target.style.height = '0px';
                    scope.slideHeight=0;
                }
                attrs.expanded = !attrs.expanded;

            });
        }
    };
});
