'use strict';

describe('MediaController', function () {
  var mockWindowScale, scope;
  
  beforeEach(module('angelMounds'));

  beforeEach(function () {
    mockWindowScale = { getWindowScale: function () { return 1; } };
    
    module(function ($provide) {
      $provide.value('windowScale', mockWindowScale);
    });
    
    inject(function ($rootScope) {
      scope = $rootScope.$new();
      scope.$index = 0;
      scope.filteredMedia = [0, 1, 2, 3];
      scope.site = {
        'radius': 1
      };
      scope.item = {
        'width': 1
      };
    });
  });

  it('should grab and release', inject(function ($controller) {
    expect(scope.grabbed).toBeUndefined();

    $controller('MediaController', {
      $scope: scope
    });
    
    expect(scope.transform.zIndex).toEqual('auto');
    
    scope.grabThis();
    
    expect(scope.grabbed).toBeDefined();
    expect(scope.grabbed).toEqual(true);
    expect(scope.transform.zIndex).toEqual(1);
    
    scope.cantTouchThis();
    
    expect(scope.grabbed).toEqual(false);
    expect(scope.transform.zIndex).toEqual(1);
  }));
  
  it('should touch this', inject(function ($controller, windowScale) {
    expect(scope.transform).toBeUndefined();

    $controller('MediaController', {
      $scope: scope
    });
    
    expect(scope.transform).toBeDefined();
   
    scope.touchThis({
      deltaX: 1 * windowScale.getWindowScale(),
      deltaY: 1 * windowScale.getWindowScale(),
      scale: 2,
      rotation: 90
    });

    expect(scope.transform).toEqual({
      translate: {
        x: 1,
        y: 1
      },
      width: 1,
      angle: 90,
      zIndex: 'auto',
      shadowX: 4,
      shadowY: 4
    });
    
    scope.cantTouchThis();
    scope.touchThis({
      deltaX: -1 * windowScale.getWindowScale(),
      deltaY: -1 * windowScale.getWindowScale(),
      scale: 0.5,
      rotation: -90
    });
    
    expect(scope.transform).toEqual({
      translate: {
        x: 0,
        y: 0
      },
      width: 0.5,
      angle: 0,
      zIndex: 'auto',
      shadowX: -4,
      shadowY: 4
    });

    scope.cantTouchThis();
    scope.touchThis({ // check minimum size enforcement
      deltaX: 0 * windowScale.getWindowScale(),
      deltaY: 0 * windowScale.getWindowScale(),
      scale: 0.001,
      rotation: 0
    });

    expect(scope.transform).toEqual({
      translate: {
        x: 0,
        y: 0
      },
      width: 0.5,
      angle: 0,
      zIndex: 'auto',
      shadowX: -4,
      shadowY: 4
    });
  }));
});
