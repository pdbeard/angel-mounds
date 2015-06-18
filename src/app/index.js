'use strict';

angular.module('angelMounds', ['ngAnimate', 'ngSanitize', 'ngResource', 'ui.router', 'hmTouchEvents', 'sitesFactory', 'mediaFactory', 'mediaFilter'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise('/');
  });
