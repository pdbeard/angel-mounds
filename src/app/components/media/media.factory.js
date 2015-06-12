'use strict';

var mediaFactory = angular.module('mediaFactory', ['ngResource']);

mediaFactory.factory('media', ['$resource',
  function ($resource) {
    return $resource('assets/media.json', {}, {
      query: {method: 'GET', params: {}, isArray: true}
    });
  }]);