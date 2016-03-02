(function() {
  'use strict';

  angular
	.module('angelMounds')
	.directive('drab', ['zIndex', drab]);

  /** @ngInject */
  function drab(zIndex) {
	var directive = {
	  restrict: 'E',
	  templateUrl: 'app/components/drab/drab.html',
	  scope: {
		config: '='
	  },
	  controller: DrabController,
	  controllerAs: 'dc',
	  bindToController: true,
	  link: link
	};

	return directive;


	function link(scope, element) {
	  /*element.children().css({
		left: scope.dc.config.left,
		bottom: scope.dc.config.bottom
	  });*/

		  scope.dc.check = function(){
		  var radio = event.target.previousElementSibling;
//		  console.log(event.currentTarget.nextElementSibling);
		  console.log("yup");

		  angular.element(radio).prop("checked",true);
		  event.target.type;
	  };
	}

	/**
	 * Controller
	 * initialize the item's transform
	 */
	/** @ngInject */
	function DrabController($scope) {
	  var dc = this;

	  dc.active = false;



	  dc.activate = function () {
		  console.log("drr");
		dc.active = !dc.active;
	  };
	}
  }

})();
