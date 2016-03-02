(function () {
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
		  var radio = event.target.previousElementSibling;

		  angular.element(radio).prop("checked",true);
	  };
      
      scope.dc.touchThis = function (event) {
        angular.element(document.querySelector('.drabPane')).css({
          'z-index': zIndex.getNextZIndex()
        });
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
        dc.active = !dc.active;
        dc.zInit = zIndex.getNextZIndex();
      };
    }
  }

})();
