'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'sites', 'media', function ($scope, sites, media) {
    $scope.sites = sites.query();
    $scope.media = media.query();
  }]);
