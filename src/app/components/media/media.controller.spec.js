'use strict';

describe('MediaController', function () {
  var mockWindow, mockWindowScale, scope;
  
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

  it('should calculate first position', inject(function ($controller) {
    expect(scope.transform).toBeUndefined();
    scope.$index = 0;

    $controller('MediaController', {
      $scope: scope
    });
    
    expect(scope.transform).toBeDefined();
    
    // 0 deg
    expect(scope.transform.translate.x).toEqual(1);
    expect(scope.transform.translate.y).toEqual(0);
  }));
  
  it('should calculate second position', inject(function ($controller) {
    expect(scope.transform).toBeUndefined();
    scope.$index = 1;

    $controller('MediaController', {
      $scope: scope
    });
    
    expect(scope.transform).toBeDefined();
    
    // 90 deg
    expect(Math.floor(scope.transform.translate.x)).toEqual(0);
    expect(scope.transform.translate.y).toEqual(1);
  }));
  
  it('should calculate third position', inject(function ($controller) {
    expect(scope.transform).toBeUndefined();
    scope.$index = 2;

    $controller('MediaController', {
      $scope: scope
    });
    
    expect(scope.transform).toBeDefined();
    
    // 180 deg
    expect(scope.transform.translate.x).toEqual(-1);
    expect(Math.floor(scope.transform.translate.y)).toEqual(0);
  }));
  
  it('should calculate fourth position', inject(function ($controller) {
    expect(scope.transform).toBeUndefined();
    scope.$index = 3;

    $controller('MediaController', {
      $scope: scope
    });
    
    expect(scope.transform).toBeDefined();
    
    // 270 deg
    expect(Math.abs(Math.ceil(scope.transform.translate.x))).toEqual(0);
    expect(scope.transform.translate.y).toEqual(-1);
  }));
  
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
    console.log(windowScale.getWindowScale());
    scope.touchThis({
      deltaX: 1 * windowScale.getWindowScale(),
      deltaY: 1 * windowScale.getWindowScale(),
      scale: 2,
      rotation: 90
    });

    expect(scope.transform).toEqual({
      translate: {
        x: 2,
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
        x: 1,
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
        x: 1,
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
