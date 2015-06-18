'use strict';

var mediaFilter = angular.module('mediaFilter', []);

mediaFilter.filter('media', function () {
  return function (media, filterObject) {
    var i, l, match, property, filteredArray = [];

    for (i = 0, l = media.length; i < l; i += 1) {
      match = false;

      for (property in filterObject) {
        if (filterObject.hasOwnProperty(property)) {
          if (media[i].hasOwnProperty(property) &&
              media[i][property] === filterObject[property]) {
            match = true;
          } else {
            break;
          }
        }
      }

      if (match) {
        filteredArray.push(media[i]);
      }
    }

    return filteredArray;
  };
});
