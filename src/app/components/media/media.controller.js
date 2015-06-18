'use strict';

angular.module('angelMounds')
  .controller('MediaController', ['$scope', function ($scope) {
    var START_ANGLE = 360 * ($scope.$index / $scope.filteredMedia.length),
      START_X = $scope.site.radius * Math.cos(START_ANGLE * (Math.PI / 180)),
      START_Y = $scope.site.radius * Math.sin(START_ANGLE * (Math.PI / 180));
    
    $scope.transform = {
      translate: {
        x: START_X,
        y: START_Y
      },
      scale: 1,
      angle: START_ANGLE
    };
    
    var oldTransform = $scope.transform;
    
    
    $scope.touchThis = function (event) {
      $scope.transform = {
        translate: {
          x: oldTransform.translate.x + event.deltaX,
          y: oldTransform.translate.y + event.deltaY
        },
        scale: oldTransform.scale + event.scale,
        angle: oldTransform.angle + event.rotation
      };
      
      console.log(event.deltaX);
    };
    
    $scope.cantTouchThis = function (event) {
      oldTransform = $scope.transform;
    };
                    
  }]);
