'use strict';

var windowScaleFactory = angular.module('windowScaleFactory', []);

windowScaleFactory.factory('windowScale', ['$window', function ($window) {  
  return {
    getWindowScale: function () {
      var widthRatio = $window.innerWidth / 3840, // hard-code for quad-HD TV
        heightRatio = $window.innerHeight / 2160,
        windowScale = widthRatio < heightRatio ? widthRatio : heightRatio;
      
      return windowScale;
    }
  };
}]);
