'use strict';

angular.module('angelMounds')
.directive('slideable', function () {
	return {
		restrict:'C',
		compile: function (element, attr) {
			// wrap tag
			var contents = element.html();
			element.html('<div class="slideable_content" style="" >' + contents + '</div>');

			return function postLink(scope, element, attrs) {
				// default properties
				attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
				attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
				element.css({
					'overflow': 'hidden',
//                  'overflow-y':'auto',
					'height': '15%',
					'position':'absolute',
					'top':'100%',
					'background-color':'white',
					'color': '#000000',
					'transitionProperty':'none',
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

		scope.clickIcon = 'info_outline';
					scope.clickIconMorph = function() {
					if (scope.clickIcon === 'close') {
						scope.clickIcon = 'info_outline';
					}
					else {
						scope.clickIcon = 'close';
					}
				};

			var target, content;
			attrs.expanded = false;
			scope.slideHeight = .2;
//          target.style.height = '20px';



			element.bind('click', function() {

				var height=(element[0].parentElement.parentElement.clientHeight);
				if (!target) target = document.querySelector(attrs.slideToggle);
				if (!content) content = target.querySelector('.slideable_content');

				target.style.transitionProperty ="height";

console.log(height);
				if(!attrs.expanded) {
//					target.style.height ="100%";
					scope.slideHeight = 1;
//					scope.arrowRotate = 180;
				} else {
//					target.style.height ="auto";
					scope.slideHeight = .2;
//				    target.style.height = '20px';
//					scope.arrowRotate = 0;
				}



				attrs.expanded = !attrs.expanded;
				setTimeout(function(){target.style.transitionProperty="none"}, 300);

			});
		}
	};
});
