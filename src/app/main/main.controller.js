'use strict';

angular.module('angelMounds')
  .controller('MainController', ['$scope', 'windowScale', 'sites', 'media', 'Idle', function ($scope, windowScale, sites, media, Idle) {
	$scope.scale = windowScale.getWindowScale();

	$scope.sites = sites.query();
	$scope.media = media.query();
	$scope.drabs = [
		{
			label: 'About',
			template: 'assets/templates/about/index.html',
			bottom: '0%',
			left: '0%'
		}
	];

	$scope.showIdleOverlay = false;


	$scope.$on('IdleStart', function() {
	  // the user appears to have gone idle
	  //console.log('idleStart');

	  // show idle overlay
	  $scope.showIdleOverlay = true;
	});

	$scope.$on('IdleWarn', function(e, countdown) {
	  // follows after the IdleStart event, but includes a countdown until the user is considered timed out
	  // the countdown arg is the number of seconds remaining until then.
	  // you can change the title or display a warning dialog from here.
	  // you can let them resume their session by calling Idle.watch()
	  //console.log('idleWarn');
	});

	$scope.$on('IdleTimeout', function() {
	  // the user has timed out (meaning idleDuration + timeout has passed without any activity)
	  // this is where you'd log them
	  //console.log('idleTimeout');

	  // hide idle overlay
	  //console.log('showIdleOverlay = ' + $scope.showIdleOverlay);
	  //$scope.showIdleOverlay = false;
	  //console.log('showIdleOverlay = ' + $scope.showIdleOverlay);

	  // restart idle
	  Idle.watch();
	});

	$scope.$on('IdleEnd', function() {
	  // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
	  //console.log('idleEnd');

	  // hide idle overlay
	  //$scope.showIdleOverlay = false;
	});





	//    // I toggle the value of isVisible.
	//    $scope.toggle = function(event) {
	//        $scope.isVisible = ! $scope.isVisible;
	//    };
	//    // Default the blocks to be visible.
	//    $scope.isVisible = false;

  }]);
