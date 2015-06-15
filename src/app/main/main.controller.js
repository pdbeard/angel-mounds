'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'sites', 'media', function ($scope, sites, media) {
    $scope.sites = sites.query();
    $scope.media = media.query();
    
    /**
     * Calculate x and y locations on a circle of the given radius
     */ 
    $scope.x = function (radius, index, length) {
      return radius * Math.cos((2 * Math.PI) * (index / length));
    };
    $scope.y = function (radius, index, length) {
      return radius * Math.sin((2 * Math.PI) * (index / length));
    };
                    
  }]);
