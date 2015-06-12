'use strict';

var sitesFactory = angular.module('sitesFactory', ['ngResource']);

sitesFactory.factory('sites', ['$resource',
  function ($resource) {
    return $resource('assets/sites.json', {}, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  }]);