'use strict';

describe('mediaFilter', function () {
  
  var media = [
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
    }],
    filterObject = { 'title': 'AngularJS' },
    filteredArray = [
      {
        'type': 'img',
        'url': 'angular.png',
        'title': 'AngularJS',
        'description': 'Superheroic JavaScript MVW Framework'
      }
    ];

  beforeEach(module('mediaFilter'));
  
  describe('query', function() {
    it('should filter', inject(function (queryFilter) {
      expect(queryFilter(media, filterObject)).toEqual(filteredArray);
    }));
  });
});
