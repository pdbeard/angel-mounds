'use strict';

angular.module('angelMounds')
  .controller('MainCtrl', ['$scope', 'sites', 'media', function ($scope, sites, media) {
    $scope.sites = sites.query();
    $scope.media = media.query();
  }]);
