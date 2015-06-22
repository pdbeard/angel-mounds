'use strict';

describe('SitesController', function () {
  var scope,
    media = [
    {
      'title': 'AngularJS'
    },
    {
      'title': 'Yeoman'
    },
    {
      'title': 'Gulp'
    }],
    site = {
      'filterObject': { 'title': 'AngularJS' }
    };
  
  beforeEach(module('angelMounds'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.media = media;
    scope.site = site;
  }));

  it('should create filtered media array', inject(function ($controller) {
    expect(scope.filteredMedia).toBeUndefined();

    $controller('SitesController', {
      $scope: scope
    });
    
    expect(scope.filteredMedia).toBeDefined();
    expect(angular.isArray(scope.filteredMedia)).toEqual(true);
  }));
});
