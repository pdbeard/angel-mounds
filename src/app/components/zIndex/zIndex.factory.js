'use strict';

var zIndexFactory = angular.module('zIndexFactory', []);

zIndexFactory.factory('zIndex', function () {
  var zIndex = 0;
  
  return {
    getNextZIndex: function () {
      zIndex = zIndex + 1; // this could theoretically reach the max int size and fail, but probably won't
      return zIndex;
    }
  };
});