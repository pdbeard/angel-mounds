'use strict';

angular.module('angelMounds')
  .controller('MainCtrl', function ($scope) {
    $scope.sites = [
      {
        'active': false,
        'logo': 'angular.png'
      },
      {
        'active': 'false',
        'logo': 'yeoman.png'
      },
      {
        'active': 'false',
        'logo': 'gulp.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
