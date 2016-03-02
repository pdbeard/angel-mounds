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

      dc.frameLoad = function () {

        var iframe = document.getElementsByClassName('itemIframe');
        var frameBody = iframe[0].contentDocument.body;
        frameBody.click();
        console.log(iframe[0].contentDocument.body);
        //	window.onload = function(){
        //		  //var iframeBody = iframe.contentWindow.document.body;
        //		  console.log("testetse");
        //}
      }
      dc.activate = function () {
        dc.active = !dc.active;
        dc.zInit = zIndex.getNextZIndex();
      };
    }
  }

})();