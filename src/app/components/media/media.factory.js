'use strict';

var mediaFactory = angular.module('mediaFactory', ['ngResource']);

mediaFactory.factory('media', ['$resource',
  function ($resource) {
    var xlsxContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    return $resource('assets/media.xlsx', {}, {
      query: {
        method: 'GET',
        params: {},
        headers: {
          accept: xlsxContentType
        },
        responseType: 'arraybuffer',
        isArray: true,
        transformResponse: function (data) {
          // processing taken from AJAX section of readme at https://github.com/SheetJS/js-xlsx
          var typedArray, arr, bstr, workbook, sheet, i;
          
          typedArray = new Uint8Array(data);

          arr = [];
          
          for (i = 0; i !== typedArray.length; ++i) {
            arr[i] = String.fromCharCode(typedArray[i]);
          }

          bstr = arr.join("");

          workbook = XLSX.read(bstr, {type: "binary"});

          sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

          return sheet;
        }
      }
    });
  }]);
