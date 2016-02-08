'use strict';

var layoutFactory = angular.module('layoutFactory', []);

layoutFactory.factory('layout', function () {
  return {
    getInit: function (type, radius, index, numItems) {
      var init = {
        x: 0,
        y: 0,
        angle: 0
      };
      
      switch (type) {
        case 'circle':
          init.angle = 360 * (index / numItems); // angle for position on circle
          init.x = radius * Math.cos(init.angle * (Math.PI / 180));
          init.y = radius * Math.sin(init.angle * (Math.PI / 180));
          init.angle = init.angle - 90; // angle for item rotation
          break;
        case 'line':
          init.x = radius + (radius / 2 * index) + (radius / 10 * index);
          break;
      }
      
      return init;
    }
  };
});
