'use strict';

describe('zIndexFactory', function () {
  var zIndex;
  
  beforeEach(module('zIndexFactory'));

  beforeEach(inject(function ($injector) {
    zIndex = $injector.get('zIndex');
  }));

  it('should return an incremented z-index', function () {
    expect(zIndex.getNextZIndex()).toEqual(1);
    expect(zIndex.getNextZIndex()).toEqual(2);
    expect(zIndex.getNextZIndex()).toEqual(3);
  });
});
