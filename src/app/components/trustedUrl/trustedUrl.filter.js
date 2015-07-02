'use strict';

var trustedUrlFilter = angular.module('trustedUrlFilter', []);

trustedUrlFilter.filter('trusted', [ '$sce', function ($sce) {
  return function (url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
