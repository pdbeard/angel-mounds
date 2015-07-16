'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'windowScale', 'sites', 'media', function ($scope, windowScale, sites, media) {
    $scope.scale = windowScale.getWindowScale();
    
    $scope.sites = sites.query();
    $scope.media = media.query();  
  }]);
