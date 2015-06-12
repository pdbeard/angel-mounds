'use strict';

angular.module('angelMounds', ['ngAnimate', 'ngSanitize', 'ngResource', 'ui.router', 'sitesFactory'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
