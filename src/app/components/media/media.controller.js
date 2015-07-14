'use strict';

angular.module('angelMounds')
  .controller('MediaController', ['$scope', '$window', function ($scope, $window) {
    var oldTransform,
      START_ANGLE = 360 * ($scope.$index / $scope.filteredMedia.length),
      START_X = $scope.site.radius * Math.cos(START_ANGLE * (Math.PI / 180)),
      START_Y = $scope.site.radius * Math.sin(START_ANGLE * (Math.PI / 180)),
      MIN_WIDTH = $scope.site.radius / 2,
      MAX_WIDTH = $window.innerWidth / 2;



    // the current state of the media item
    $scope.transform = {
      translate: {
        x: START_X,
        y: START_Y
      },
      angle: START_ANGLE,
      width: MIN_WIDTH
    };

    // new transforms are applied relative to the old one
    oldTransform = $scope.transform;

    // a grabbed item is raised above the other items
    $scope.grabThis = function () {
      $scope.grabbed = true;
    };

    // update the item's transform based on the touch event
    $scope.touchThis = function ($event) {
      var width, newWidth = oldTransform.width * $event.scale;

      if (newWidth < MIN_WIDTH) {
        width = MIN_WIDTH;
      } else if (newWidth > MAX_WIDTH) {
        width = MAX_WIDTH;
      } else {
        width = newWidth;
      }

      $scope.transform = {
        translate: {
          x: oldTransform.translate.x + $event.deltaX,
          y: oldTransform.translate.y + $event.deltaY
        },
        angle: oldTransform.angle + $event.rotation,
        width: width
      };
    };

    // save the current transform
    $scope.cantTouchThis = function () {
      oldTransform = $scope.transform;
      $scope.grabbed = false;
    };

    // Force loads X3D content
    $scope.initX3D = function(){
            x3dom.reload();
    };

  }]);
