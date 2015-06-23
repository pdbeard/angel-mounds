'use strict';

describe('MainController', function () {
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
    mockMedia = [
      {
        'type': 'img',
        'url': 'angular.png',
        'title': 'AngularJS',
        'description': 'Superheroic JavaScript MVW Framework'
      },
      {
        'type': 'img',
        'url': 'yeoman.png',
        'title': 'Yeoman',
        'description': 'The web\'s scaffolding tool for modern webapps'
      },
      {
        'type': 'img',
        'url': 'gulp.png',
        'title': 'Gulp',
        'description': 'Automate and enhance your workflow'
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
  beforeEach(module('mediaFactory'));

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('assets/sites.json').respond(mockSites);
    $httpBackend.expectGET('assets/media.json').respond(mockMedia);
    $httpBackend.expectGET('app/main/main.html').respond(); // analytics request?
    scope = $rootScope.$new();
  }));

  it('should create "sites" model from XHR request', inject(function ($controller) {
    expect(scope.sites).toBeUndefined();

    $controller('MainController', {
      $scope: scope
    });
    
    $httpBackend.flush();

    expect(angular.isArray(scope.sites)).toEqual(true);
    expect(scope.sites).toEqualData(mockSites);
  }));
  
  it('should create "media" model from XHR request', inject(function ($controller) {
    expect(scope.media).toBeUndefined();

    $controller('MainController', {
      $scope: scope
    });
    
    $httpBackend.flush();

    expect(angular.isArray(scope.media)).toEqual(true);
    expect(scope.media).toEqualData(mockMedia);
  }));
});
