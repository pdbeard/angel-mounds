(function() {
  'use strict';

  angular
    .module('angelMounds')
    .directive('mediaItem', ['zIndex', mediaItem]);

  /** @ngInject */
  function mediaItem(zIndex) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/media/mediaItem.html',
      scope: {
        hub: '=',
        thing: '=',
        index: '=',
        items: '='
      },
      controller: MediaItemController,
      controllerAs: 'item',
      bindToController: true,
      link: link
    };

    return directive;
    
    
    function link(scope, element) {
      var newTransform = {};
      
      applyTransform(scope.item.transform);
      
      
      /**
       * Convert transform properties to string and apply to element's style
       * @param transform 
       */ 
      function applyTransform(transform) {
        var transformString = '',
            shadowString = '', 
            topValue = 0,
            footerHeight = 359; // magic number from slideable directive
        
        transformString = 'translate3d(' + transform.translate.x + 'px, ' + 
          transform.translate.y + 'px, 0px) ';
        transformString += 'scale(' + transform.scale + ', ' + 
          transform.scale + ') ';
        transformString += 'rotate(' + transform.angle + 'deg)'; 
        
//        shadowString = '0px 0px ' + 50/transform.scale + 'px rgba(0, 0, 0, 0.99)';
        shadowString = '0px 0px 50px rgba(0, 0, 0, 0.99)';
        
        // compensate for item height because transform-origin is in the center
        topValue = -1 * (scope.item.thing.height)/(scope.item.thing.width/1920)/2;
        topValue -= footerHeight/2; // compensate for footer buffer
        
        
        element.children().css({
          left: '-960px',
          top: topValue + 'px',
          transform: transformString,
          'box-shadow': shadowString,
          'z-index': transform.zIndex
        });
      }
      
      // stop tap events from bubbling up to the sites
      scope.item.touchThis = function (event) {
        event.srcEvent.stopImmediatePropagation();
        
        scope.item.transform.zIndex = zIndex.getNextZIndex();
        applyTransform(scope.item.transform);
        
      };
      
      /**
       * Process touch event
       */ 
      scope.item.manipulateThis = function (event) {
        var transform = scope.item.transform,
            scaleNew = transform.scale * event.scale,
            angleNew = transform.angle + event.rotation;
        
        if (scaleNew > scope.item.SCALE_MAX) {
          scaleNew = scope.item.SCALE_MAX;
        } else if (scaleNew < scope.item.SCALE_MIN) {
          scaleNew = scope.item.SCALE_MIN;
        }
        
        newTransform = {
          translate: {
            x: transform.translate.x + event.deltaX / scope.item.WINDOW_SCALE,
            y: transform.translate.y + event.deltaY / scope.item.WINDOW_SCALE
          },
          angle: angleNew,
          scale: scaleNew
        };
        
        applyTransform(newTransform);
      };
      
      /**
       * Save transform
       */ 
      scope.item.cantTouchThis = function () {
        scope.item.transform = newTransform;
      };
    }

    /**
     * Controller
     * initialize the item's transform
     */ 
    /** @ngInject */
    function MediaItemController($window, windowScale, layout, $scope, $sce) {
      var item = this,
          init = layout.getInit(item.hub.layout,
                                item.hub.radius,
                                item.index, 
                                item.items.length,
                                item.hub.layoutAngle);
      
      item.SCALE_MIN = 0.1;
      item.SCALE_MAX = 1.0;
      item.WINDOW_SCALE = windowScale.getWindowScale();
      
      item.transform = {
        translate: {
          x: init.x,
          y: init.y
        },
        scale: item.SCALE_MIN,
        angle: init.angle,
        zIndex: 'auto'
      };
      
      // for video only
      item.theme = "bower_components/videogular-themes-default/videogular.css";
      item.sources = [
        {
          src: $sce.trustAsResourceUrl("assets/images/Drone443Unedited.webm"), 
          type: "video/webm"
        }
      ];
    }
  }

})();