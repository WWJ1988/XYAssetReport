define([
], function () {
  'use strict';
  Date.prototype.format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  Date.prototype.addDays = function (days) {
    var value = this.valueOf();
    value = value + days * 24 * 60 * 60 * 1000;
    return new Date(value);
  };

  Date.prototype.compareTo = function (otherDate) {
    var thisYear = this.getFullYear();
    var thisMonth = this.getMonth();
    var thisDay = this.getDate();

    var thatYear = otherDate.getFullYear();
    var thatMonth = otherDate.getMonth();
    var thatDay = otherDate.getDate();

    if (thisYear > thatYear
      || thisYear == thatYear && thisMonth > thatMonth
      || this.thatYear == thatYear && thisMonth == thatMonth && thisDay > thatDay) {
      return 1;
    }
    else if (this.thatYear == thatYear && thisMonth == thatMonth && thisDay == thatDay) {
      return 0;
    }
    else {
      return -1;
    }
  }

  function fetchXML(datas) {
    var wrkbookXML = '<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">' +
      '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author></DocumentProperties>' +
      '<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">' +
      '<AllowPNG/>' +
      '<RemovePersonalInformation/>' +
      '</OfficeDocumentSettings>' +
      '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">' +
      '<WindowHeight>15020</WindowHeight>' +
      '<WindowWidth>25360</WindowWidth>' +
      '<WindowTopX>2660</WindowTopX>' +
      '<WindowTopY>0</WindowTopY>' +
      '<ProtectStructure>False</ProtectStructure>' +
      '<ProtectWindows>False</ProtectWindows>' +
      '</ExcelWorkbook>' +
      '<Styles>' +
      '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
      '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
      '<Style ss:ID="Title"><Font ss:Bold="1"></Font></Style>' +
      '</Styles>';

    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var columnDefs = data.columnDefs;
      var exportData = data.exportData;
      var sheetName = data.sheetName;

      wrkbookXML += '<Worksheet ss:Name="' + sheetName + '"><Table>';

      var rowXML = "";
      var header = '<Row ss:StyleID="Title">';
      for (var k = 0; k < columnDefs.length; k++) {
        rowXML += '<Column ss:AutoFitWidth="1" ss:Width="150" />';
        header += '<Cell><Data ss:Type="String">' + columnDefs[k].displayName + "</Data></Cell>";
      }
      header += "</Row>";
      rowXML += header;

      for (var j = 0; j < exportData.length; j++) {
        rowXML += "<Row>";
        for (var m = 0; m < columnDefs.length; m++) {
          rowXML += '<Cell><Data ss:Type="String">' + exportData[j][columnDefs[m].field] + "</Data></Cell>";
        }
        rowXML += '</Row>';
      }

      wrkbookXML += rowXML;
      wrkbookXML += '</Table><AutoFilter xmlns="urn:schemas-microsoft-com:office:excel" x:Range="R1C1:R22C5"></AutoFilter></Worksheet>';
    }
    wrkbookXML += '</Workbook>';

    return wrkbookXML;
  }

  var common = {};

  common.formatAsExcel = function (columnDefs, exportData, sheetName) {
    return fetchXML([{ columnDefs: columnDefs, exportData: exportData, sheetName: sheetName }]);
    var self = this;
    var excel = "<table>";
    excel += "<tr>";
    for (var i = 0; i < columnDefs.length; i++) {
      excel += "<td>" + columnDefs[i].displayName + "</td>";
    }
    excel += '</tr>';

    for (var j = 0; j < exportData.length; j++) {
      excel += "<tr>";
      for (var i = 0; i < columnDefs.length; i++) {
        excel += "<td>" + exportData[j][columnDefs[i].field] + "</td>";
      }
      excel += '</tr>';
    }
    excel += '</table>'

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{Sheet1}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{Sheet2}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";

    return excelFile;
  };

  /**
          * @ngdoc function
          * @name downloadFile
          * @methodOf  ui.grid.exporter.service:uiGridExporterService
          * @description Triggers download of a csv file.  Logic provided
          * by @cssensei (from his colleagues at https://github.com/ifeelgoods) in issue #2391
          * @param {string} fileName the filename we'd like our file to be
          * given
          * @param {string} csvContent the csv content that we'd like to
          * download as a file
          * @param {boolean} exporterOlderExcelCompatibility whether or not we put a utf-16 BOM on the from (\uFEFF)
           * @param {boolean} exporterIsExcelCompatible whether or not we add separator header ('sep=X')
          */
  common.downloadFile = function (fileName, csvContent, columnSeparator, exporterOlderExcelCompatibility, exporterIsExcelCompatible) {
    var D = document;
    var a = D.createElement('a');
    //var strMimeType = 'application/octet-stream;charset=utf-8';
    var strMimeType = 'application/octet-stream';
    var rawFile;
    var ieVersion = isIE();

    if (exporterIsExcelCompatible) {
      csvContent = 'sep=' + columnSeparator + '\r\n' + csvContent;
    }

    // IE10+
    if (navigator.msSaveBlob) {
      return navigator.msSaveOrOpenBlob(
        new Blob(
          [exporterOlderExcelCompatibility ? "\uFEFF" : '', csvContent],
          { type: strMimeType }),
        fileName
      );
    }

    if (ieVersion) {
      var frame = D.createElement('iframe');
      document.body.appendChild(frame);

      frame.contentWindow.document.open('text/html', 'replace');
      frame.contentWindow.document.write(csvContent);
      frame.contentWindow.document.close();
      frame.contentWindow.focus();
      frame.contentWindow.document.execCommand('SaveAs', true, fileName);

      document.body.removeChild(frame);
      return true;
    }

    //html5 A[download]
    if ('download' in a) {
      var blob = new Blob(
        [exporterOlderExcelCompatibility ? "\uFEFF" : '', csvContent],
        { type: strMimeType }
      );
      rawFile = URL.createObjectURL(blob);
      a.setAttribute('download', fileName);
    } else {
      rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(csvContent);
      a.setAttribute('target', '_blank');
    }

    a.href = rawFile;
    a.setAttribute('style', 'display:none;');
    D.body.appendChild(a);
    setTimeout(function () {
      if (a.click) {
        a.click();
        // Workaround for Safari 5
      } else if (document.createEvent) {
        var eventObj = document.createEvent('MouseEvents');
        eventObj.initEvent('click', true, true);
        a.dispatchEvent(eventObj);
      }
      D.body.removeChild(a);

    }, this.delay);
  };

  function isIE() {
    var match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
    var isIE = false;

    if (match !== -1) {
      isIE = true;
    }

    return isIE;
  };

  return common;
});