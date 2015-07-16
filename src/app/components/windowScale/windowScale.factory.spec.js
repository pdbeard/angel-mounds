'use strict';

describe('windowScaleFactory', function () {
  var mockWindow, windowScale;
  
  beforeEach(module('windowScaleFactory'));

  it('should not scale', function () {
    mockWindow = { innerWidth: 3840, innerHeight: 2160 };
    
    module(function ($provide) {
      $provide.value('$window', mockWindow);
    });
    
    inject(function ($injector) {
      windowScale = $injector.get('windowScale');
    });
    
    expect(windowScale.getWindowScale()).toEqual(1);
  });
  
  it('should scale down', function () {
    mockWindow = { innerWidth: 384, innerHeight: 216 };
    
    module(function ($provide) {
      $provide.value('$window', mockWindow);
    });
    
    inject(function ($injector) {
      windowScale = $injector.get('windowScale');
    });
    
    expect(windowScale.getWindowScale()).toEqual(0.1);
  });
  
  it('should scale up', function () {
    mockWindow = { innerWidth: 38400, innerHeight: 21600 };
    
    module(function ($provide) {
      $provide.value('$window', mockWindow);
    });
    
    inject(function ($injector) {
      windowScale = $injector.get('windowScale');
    });
    
    expect(windowScale.getWindowScale()).toEqual(10);
  });
  
  it('should scale with width', function () {
    mockWindow = { innerWidth: 384, innerHeight: 2160 };
    
    module(function ($provide) {
      $provide.value('$window', mockWindow);
    });
    
    inject(function ($injector) {
      windowScale = $injector.get('windowScale');
    });
    
    expect(windowScale.getWindowScale()).toEqual(0.1);
  });
  
  it('should scale with height', function () {
    mockWindow = { innerWidth: 3840, innerHeight: 216 };
    
    module(function ($provide) {
      $provide.value('$window', mockWindow);
    });
    
    inject(function ($injector) {
      windowScale = $injector.get('windowScale');
    });
    
    expect(windowScale.getWindowScale()).toEqual(0.1);
  });
});
