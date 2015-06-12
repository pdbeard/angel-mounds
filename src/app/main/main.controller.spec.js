'use strict';

describe('MainCtrl', function () {
  var scope,
    $httpBackend,
    mockSites = [
      {
        'active': false,
        'logo': 'angular.png',
        'top': '100px',
        'left': '500px'
      },
      {
        'active': false,
        'logo': 'yeoman.png',
        'top': '400px',
        'left': '300px'
      },
      {
        'active': false,
        'logo': 'gulp.png',
        'top': '500px',
        'left': '800px'
      }
    ],
    customMatchers = {
      toEqualData: function () { // necessary because $resource introduces extra junk causing toEqual to return false
        return {
          compare: function (actual, expected) {
            var result = {};
            result.pass = angular.equals(actual, expected);
            
            if (result.pass) {
              result.messsage = 'toEqualData passed!';
            } else {
              result.messsage = 'Expected ' + actual + ' to be ' + expected;
            }
            
            return result;
          }
        };
      }
    };
  
  beforeEach(function () {
    jasmine.addMatchers(customMatchers);
  });

  beforeEach(module('angelMounds'));
  beforeEach(module('sitesFactory'));

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('assets/sites.json').respond(mockSites);
    scope = $rootScope.$new();
  }));

  it('should create "sites" model with 3 sites', inject(function ($controller) {
    expect(scope.sites).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });
    
    $httpBackend.flush();

    expect(angular.isArray(scope.sites)).toBeTruthy();
    expect(scope.sites).toEqualData(mockSites);
  }));
});
