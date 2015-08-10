'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'windowScale', 'sites', 'media', function ($scope, windowScale, sites, media) {
    $scope.scale = windowScale.getWindowScale();

    $scope.sites = sites.query();
    $scope.media = media.query();


//    // I toggle the value of isVisible.
//    $scope.toggle = function(event) {
//        $scope.isVisible = ! $scope.isVisible;
//    };
//    // Default the blocks to be visible.
//    $scope.isVisible = false;

  }]);
