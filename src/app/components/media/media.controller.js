'use strict';

angular.module('angelMounds')
  .controller('MediaController', ['$scope', '$window', 'zIndex', function ($scope, $window, zIndex) {
    var oldTransform,
      START_ANGLE = 360 * ($scope.$index / $scope.filteredMedia.length),
      START_X = $scope.site.radius * Math.cos(START_ANGLE * (Math.PI / 180)),
      START_Y = $scope.site.radius * Math.sin(START_ANGLE * (Math.PI / 180)),
      MIN_WIDTH = $scope.site.radius / 2,
      MAX_WIDTH = $window.innerWidth / 2;

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
        x: START_X,
        y: START_Y
      },
      angle: START_ANGLE,
      width: MIN_WIDTH,
      zIndex: 'auto'
    };

    // new transforms are applied relative to the old one
    oldTransform = $scope.transform;

    // a grabbed item is raised above the other items
    $scope.grabThis = function ($event) {
      $scope.grabbed = true;
      
      $scope.transform.zIndex = zIndex.getNextZIndex();
      
      //console.log(angular.element($event.element[0])[0]);
      //angular.element(angular.element($event.element[0])).css('z-index', zIndex.getNextZIndex());
      
      //$scope.zIndex = $scope.zIndex + 1;
      //angular.element($event.element[0]).css('z-index', $scope.zIndex);
      //console.log(angular.element($event.element[0]).css('z-index'));
      //console.log($scope.zIndex);
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
      
      /*$scope.transform.translate.x = oldTransform.translate.x + $event.deltaX;
      $scope.transform.translate.y = oldTransform.translate.y + $event.deltaY;
      $scope.transform.angle = oldTransform.angle + $event.rotation;*/

      $scope.transform = {
        translate: {
          x: oldTransform.translate.x + $event.deltaX,
          y: oldTransform.translate.y + $event.deltaY
        },
        angle: oldTransform.angle + $event.rotation,
        width: width,
        zIndex: $scope.transform.zIndex,

        // adds shadow to scope
        shadowX: shadowRotate((oldTransform.angle + $event.rotation))[0],
        shadowY: shadowRotate((oldTransform.angle + $event.rotation))[1]
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
