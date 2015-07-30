'use strict';

describe('layoutFactory', function () {
  var layout;
  
  beforeEach(module('layoutFactory'));

  beforeEach(inject(function ($injector) {
    layout = $injector.get('layout');
  }));

  it('should calculate null layout', function () {
    expect(layout.getInit('foobar', {}, 100, 0, 4)).toEqual({ x: 0, y: 0, angle: 0}); // name shouldn't matter
    expect(layout.getInit('', {}, 100, 0, 4)).toEqual({ x: 0, y: 0, angle: 0}); // should return same for all items
    expect(layout.getInit('', {}, 100, 1, 4)).toEqual({ x: 0, y: 0, angle: 0});
  });
  
  it('should calculate circle layout', function () {    
    var init = layout.getInit('circle', {}, 100, 0, 4);
    expect(Math.round(init.x)).toEqual(100);
    expect(init.y).toEqual(0);
    expect(init.angle + 90).toEqual(0);
    
    init = layout.getInit('circle', {}, 100, 1, 4);
    expect(Math.round(init.x)).toEqual(0);
    expect(init.y).toEqual(100);
    expect(init.angle + 90).toEqual(90);
    
    init = layout.getInit('circle', {}, 100, 2, 4);
    expect(init.x).toEqual(-100);
    expect(Math.round(init.y)).toEqual(0);
    expect(init.angle + 90).toEqual(180);
    
    init = layout.getInit('circle', {}, 100, 3, 4);
    expect(Math.abs(Math.round(init.x))).toEqual(0);
    expect(init.y).toEqual(-100);
    expect(init.angle + 90).toEqual(270);
  });
  
  it('should calculate line layout', function () {
    expect(layout.getInit('line', {}, 100, 0, 4)).toEqual({ x: 100, y: 0, angle: 0});
    expect(layout.getInit('line', {}, 100, 1, 4)).toEqual({ x: 160, y: 0, angle: 0});
    expect(layout.getInit('line', {}, 100, 2, 4)).toEqual({ x: 220, y: 0, angle: 0});
  });
});
