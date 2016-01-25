'use strict';

angular.module('angelMounds',
               ['ngAnimate',
                'ngMaterial',
                'ngSanitize',
                'ngResource',
                'ui.router',
                'hmTouchEvents',
                'sitesFactory',
                'mediaFactory',
                'zIndexFactory',
                'windowScaleFactory',
                'layoutFactory',
                'mediaFilter',
                'trustedUrlFilter',
                'angulartics',
                'angulartics.google.analytics',
                'ngIdle'])
  .config(function ($stateProvider, $urlRouterProvider, IdleProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      });
  
    $urlRouterProvider.otherwise('/');
  
    // configure idle settings
    IdleProvider.idle(60);
    IdleProvider.timeout(20);
  })
  .run(function (Idle) {
    Idle.watch();
  });
