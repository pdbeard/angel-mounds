'use strict';

angular.module('angelMounds')
  .controller('SitesController', ['$scope', 'mediaFilter', '$analytics', function ($scope, mediaFilter, $analytics) {
    var sc = this;
    sc.filteredMedia = mediaFilter($scope.media, $scope.site.filterObject);
    
    sc.analyticsLogSite = function () {
      sc.filteredMedia = mediaFilter($scope.media, $scope.site.filterObject);
      sc.active = !sc.active;
      
      $analytics.eventTrack('site', {label: $scope.site.filterObject.category});
    };
  }]);
