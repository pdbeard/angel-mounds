'use strict';

angular.module('angelMounds')
  .controller('SitesController', ['$scope', 'mediaFilter', function ($scope, mediaFilter) {
    $scope.filteredMedia = mediaFilter($scope.media, $scope.site.filterObject);
    //console.log($scope.media);
    //console.log(this.filteredMedia);
  }]);
