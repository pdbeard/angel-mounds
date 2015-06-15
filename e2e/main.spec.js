'use strict';

describe('The main view', function () {
  var page;
  
  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });
  
  it('should include 3 sites', function () {
    expect(page.sites.count()).toBe(3);
  });

});

describe('The first site', function () {
  var page;
  
  beforeEach(function () {
    this.addMatchers({
      toHaveClass: function(a) {
        return this.actual.getAttribute('class').then(function(cls){
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
    expect(page.firstSite).not.toHaveClass('active');
    page.firstSite.click();
    expect(page.firstSite).toHaveClass('active');
    page.firstSite.click();
    expect(page.firstSite).not.toHaveClass('active');
  });
  
  it('should add filtered media when clicked', function () {
    var mediaOnScreen = element.all(by.repeater('item in media'));
    
    expect(mediaOnScreen.count()).toBe(0);
    page.firstSite.click();
    expect(mediaOnScreen.count()).toBe(4);
    page.firstSite.click();
    expect(mediaOnScreen.count()).toBe(0);
  });
});
