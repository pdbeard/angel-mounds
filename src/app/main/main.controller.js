'use strict';

angular.module('angelMounds')
  .controller('MainCtrl', ['$scope', 'sites', function ($scope, sites) {
    $scope.sites = sites.query();
  }]);
