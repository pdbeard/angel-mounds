'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'sites', 'media', function ($scope, sites, media) {
    $scope.sites = sites.query();
    $scope.media = media.query();
    
    $scope.x = function (index, length) {
      return 150 * Math.cos(360 * index / length);
    };
    $scope.y = function (index, length) {
      return 150 * Math.sin(360 * index / length);
    };
                    
  }]);
