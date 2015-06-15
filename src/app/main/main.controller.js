'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'sites', 'media', function ($scope, sites, media) {
    $scope.sites = sites.query();
    $scope.media = media.query();
    
    /**
     * Calculate item locations on a circle of the given radius
     */
    $scope.theta = function (index, length) {
      return 360 * (index / length);
    };
    $scope.x = function (radius, index, length) {
      return radius * Math.cos($scope.theta(index, length) * (Math.PI / 180));
    };
    $scope.y = function (radius, index, length) {
      return radius * Math.sin($scope.theta(index, length) * (Math.PI / 180));
    };
                    
  }]);
