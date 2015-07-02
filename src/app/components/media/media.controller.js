'use strict';

angular.module('angelMounds')
  .controller('MediaController', ['$scope', function ($scope) {
    var oldTransform,
      START_SCALE = ($scope.site.radius - 50) / $scope.item.width,
      START_ANGLE = 360 * ($scope.$index / $scope.filteredMedia.length),
      START_X = $scope.site.radius * Math.cos(START_ANGLE * (Math.PI / 180)),
      START_Y = $scope.site.radius * Math.sin(START_ANGLE * (Math.PI / 180));
    
    // the current state of the media item
    $scope.transform = {
      translate: {
        x: START_X,
        y: START_Y
      },
      scale: START_SCALE,
      angle: START_ANGLE
    };
    
    // new transforms are applied relative to the old one
    oldTransform = $scope.transform;
    
    // a grabbed item is raised above the other items
    $scope.grabThis = function () {
      $scope.grabbed = true;
    };
    
    // update the item's transform based on the touch event
    $scope.touchThis = function ($event) {
      $scope.transform = {
        translate: {
          x: oldTransform.translate.x + $event.deltaX,
          y: oldTransform.translate.y + $event.deltaY
        },
        scale: oldTransform.scale * $event.scale,
        angle: oldTransform.angle + $event.rotation
      };
    };
    
    // save the current transform
    $scope.cantTouchThis = function () {
      oldTransform = $scope.transform;
      $scope.grabbed = false;
    };
  }]);
