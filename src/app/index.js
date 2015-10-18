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
				'angulartics.google.analytics'])
  .config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state('home', {
		url: '/',
		templateUrl: 'app/main/main.html',
		controller: 'MainController'
	  });

	$urlRouterProvider.otherwise('/');
  });
