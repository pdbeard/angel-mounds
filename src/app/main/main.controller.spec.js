'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('angelMounds'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define 3 sites', inject(function($controller) {
    expect(scope.sites).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(angular.isArray(scope.sites)).toBeTruthy();
    expect(scope.sites.length).toBe(3);
  }));
});
