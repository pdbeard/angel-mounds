'use strict';

angular.module('angelMounds',
			   ['ngAnimate',
				'ngMaterial',
		'ngMdIcons',
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
				'ngIdle',
                'com.2fdevs.videogular',
                'com.2fdevs.videogular.plugins.controls',
                'com.2fdevs.videogular.plugins.overlayplay'])
  .config(function ($stateProvider, $urlRouterProvider, IdleProvider) {
	$stateProvider
	  .state('home', {
		url: '/',
		templateUrl: 'app/main/main.html',
		controller: 'MainController'
	  });

	$urlRouterProvider.otherwise('/');

	// configure idle settings
	IdleProvider.idle(120);
	IdleProvider.timeout(30);
  })
  .run(function (Idle) {
	Idle.watch();
  });
