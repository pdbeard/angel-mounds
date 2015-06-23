'use strict';

describe('The main view', function () {
  var page;
  
  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });
  
  it('should include 3 sites', function () {
    expect(page.sites.count()).toEqual(3);
  });

});

describe('The first site', function () {
  var page;
  
  beforeEach(function () {
    this.addMatchers({
      toHaveClass: function (a) {
        return this.actual.getAttribute('class').then(function (cls) {
          var patt = new RegExp('(^|\\s)' + a + '(\\s|$)');
          return patt.test(cls);
        });
      }
    });
  });

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });
  
  it('should toggle the active class when clicked', function () {
    expect(page.firstSite).not.toHaveClass('on');
    page.firstSite.click();
    expect(page.firstSite).toHaveClass('on');
    page.firstSite.click();
    expect(page.firstSite).not.toHaveClass('on');
  });
  
  it('should add filtered media when clicked', function () {
    var mediaOnScreen = element.all(by.repeater('item in filteredMedia'));
    
    expect(mediaOnScreen.count()).toBe(0);
    page.firstSite.click();
    expect(mediaOnScreen.count()).toBe(4);
    page.firstSite.click();
    expect(mediaOnScreen.count()).toBe(0);
  });
});

/*describe('The first media item', function () {
  var page, driver;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    driver = browser.driver;
    page = require('./main.po');
  });
  
  it('should move when dragged', function () {
    var mediaOnScreen,
      firstItem,
      style0 = 'transform: translate(150px, 0px) rotate(-90deg) scale(1);',
      style1 = 'transform: translate(150px, 100px) rotate(-90deg) scale(1);';
    
    page.firstSite.click();
    
    mediaOnScreen = element.all(by.repeater('item in filteredMedia'));
    firstItem = mediaOnScreen.first();
    
    expect(mediaOnScreen.count()).toBe(4);
    expect(firstItem).toBeTruthy();
    expect(firstItem.getAttribute('style')).toEqual(style0);
    
    driver.actions()
      .mouseDown(firstItem)
      .mouseMove(page.firstSite)
      .mouseUp(firstItem)
      .perform();
    
    expect(firstItem.getAttribute('style')).toEqual(style1);
  });
});*/
