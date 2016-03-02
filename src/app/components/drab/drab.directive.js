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

		  scope.dc.check = function(){
		  var radio = angular.element(event.target.previousElementSibling);

		  if (radio.prop("checked")){
			  radio.prop("checked", false);
		  }else{
			  radio.prop("checked",true);
		  }


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
