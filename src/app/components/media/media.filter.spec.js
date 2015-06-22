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
      'url': 'gulp.png',
      'title': 'Yeoman',
      'description': 'The web\'s scaffolding tool for modern webapps'
    },
    {
      'type': 'img',
      'url': 'gulp.png',
      'title': 'Gulp',
      'description': 'Automate and enhance your workflow'
    }],
    filterObjectSingle = { 'title': 'AngularJS' },
    filterObjectMultiple = { 'title': 'Gulp', 'url': 'gulp.png' },
    filteredArraySingle = [
      {
        'type': 'img',
        'url': 'angular.png',
        'title': 'AngularJS',
        'description': 'Superheroic JavaScript MVW Framework'
      }
    ],
    filteredArrayMultiple = [
      {
        'type': 'img',
        'url': 'gulp.png',
        'title': 'Gulp',
        'description': 'Automate and enhance your workflow'
      }
    ];

  beforeEach(module('mediaFilter'));
  
  describe('mediaFilter', function() {
    it('should filter for a single property', inject(function (mediaFilter) {
      expect(mediaFilter(media, filterObjectSingle)).toEqual(filteredArraySingle);
    }));
    
    it('should filter for multiple properties', inject(function (mediaFilter) {
      expect(mediaFilter(media, filterObjectMultiple)).toEqual(filteredArrayMultiple);
    }));
  });
});
