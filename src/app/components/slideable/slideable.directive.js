'use strict';

angular.module('angelMounds')
.directive('slideable', function () {
	return {
		restrict:'C',
		compile: function (element, attr) {
			// Wrap tag
			var contents = element.html();
			element.html('<div class="slideable_content" style="" >' + contents + '</div>');

			return function postLink(scope, element, attrs) {
				// Default properties
				attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
				attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
				var titleSize = element[0].firstChild.querySelector(".titlebox").clientHeight;

				console.log(titleSize); //returns correct size if more text is added, wrong size if one line

				// Guessing I need the whole CSS style here so it doesn't get overridden.
				element.css({
					'overflow': 'hidden',
//				    'overflow-y':'auto',
//					'height': titleSize+"px",
					'height': "359px",
					'position':'absolute',
//					'top':'100%',
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
.directive('slideToggle', ['$analytics', function($analytics) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs)
		{
			var target;
			var height=(element[0].parentElement.clientHeight);
			if (!target) target = element[0].parentElement.parentElement.parentElement;
			target.style.transitionProperty ="height";

			scope.clickIcon = 'info_outline';
			scope.clickIconMorph = function(event)
			{
			  event.srcEvent.stopImmediatePropagation();	
              
              if (scope.clickIcon === 'close') {
					scope.clickIcon = 'info_outline';
					target.style.height = height +"px";
				}
				else {
					scope.clickIcon = 'close';
					target.style.height ="100%";
                  $analytics.eventTrack('itemInfo', { label: scope.$parent.item.thing.title });
				}
				attrs.expanded = !attrs.expanded;
				//setTimeout(function(){target.style.transitionProperty="none"}, 300);
			};
		}
	};
}]);
