'use strict';

angular.module('angelMounds')
  .controller('MediaController', ['$scope', '$window', 'windowScale', 'zIndex', 'layout', function ($scope, $window, windowScale, zIndex, layout) {
	var oldTransform,
	  WINDOW_SCALE = windowScale.getWindowScale(),
	  MIN_WIDTH = $scope.site.radius / 1.25,
	  MAX_WIDTH = $window.innerWidth / 2 / WINDOW_SCALE,
	  init = layout.getInit($scope.site.layout,
							$scope.site.layoutOptions,
							$scope.site.radius,
							$scope.$index,
							$scope.filteredMedia.length);

	// Define shadow angle from media's angle
	function shadowRotate(angle) {
	  var offset = 5,
		  aOffset = -45,
		  x = Math.round(Math.sin((angle + aOffset) * (Math.PI / 180)) * offset, 2),
		  y = Math.round(Math.cos((angle + aOffset) * (Math.PI / 180)) * offset, 2);
	  return [x, y];
	}

	// the current state of the media item
	$scope.transform = {
	  translate: {
		x: init.x,
		y: init.y
	  },
	  angle: init.angle,
	  width: MIN_WIDTH,
	  zIndex: 'auto'
	};

	// new transforms are applied relative to the old one
	oldTransform = $scope.transform;

	// a grabbed item is raised above the other items
	$scope.grabThis = function () {
	  $scope.grabbed = true;
	  $scope.transform.zIndex = zIndex.getNextZIndex();
	};

	// update the item's transform based on the touch event
	$scope.touchThis = function ($event) {
	  var width,
		newWidth = oldTransform.width * $event.scale,
		shadow = shadowRotate((oldTransform.angle + $event.rotation));

	  if (newWidth < MIN_WIDTH) {
		width = MIN_WIDTH;
	  } else if (newWidth > MAX_WIDTH) {
		width = MAX_WIDTH;
	  } else {
		width = newWidth;
	  }

	  $scope.transform = {
		translate: {
		  x: oldTransform.translate.x + ($event.deltaX / WINDOW_SCALE),
		  y: oldTransform.translate.y + ($event.deltaY / WINDOW_SCALE)
		},
		angle: oldTransform.angle + $event.rotation,
		width: width,
		height: $event.element[0].clientHeight,
		zIndex: $scope.transform.zIndex,

		// adds shadow to scope
		shadowX: shadow[0],
		shadowY: shadow[1],

		contentScale: width/MIN_WIDTH

	  };
	};

	// save the current transform
	$scope.cantTouchThis = function () {
	  oldTransform = $scope.transform;
	  $scope.grabbed = false;
	};

	// Force loads X3D content
	$scope.initX3D = function () {
	  x3dom.reload();
	};

  }]);
