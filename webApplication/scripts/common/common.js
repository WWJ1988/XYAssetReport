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

  function getStyleString(type, value) {
    switch (type) {
      case "Currency":
      case "number":
        return '><Data ss:Type="Number">' + value + "</Data></Cell>";
    }

    return '><Data ss:Type="String">' + value + "</Data></Cell>"
  }

  var common = {};

  common.formatAsExcel = function (datas, isComplexExport) {
    var wrkbookXML = '<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">' +
      '<Styles>' +
      '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
      '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
      '<Style ss:ID="Title"><Font ss:Bold="1"></Font></Style>' +
      '</Styles>';

    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var columnDefs = data.columnDefs;
      var exportDatas = data.exportDatas;
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

      for (var index = 0; index < exportDatas.length; index++) {
        var exportData = exportDatas[index];
        if (!isComplexExport) {
          rowXML += "<Row>";
          for (var m = 0; m < columnDefs.length; m++) {
            rowXML += '<Cell';
            rowXML += getStyleString(columnDefs[m].type, exportData[columnDefs[m].field]);
          }
          rowXML += '</Row>';
        }
        else {
          for (var dataKey in exportData) {
            var separatData = exportData[dataKey];
            if (separatData.length > 0) {
              var firstData = separatData[0];
              rowXML += "<Row>";
              var mergedColumnName = "";
              for (var m = 0; m < columnDefs.length; m++) {
                rowXML += '<Cell';
                if (columnDefs[m].cellMerge && separatData.length > 1) {
                  mergedColumnName = columnDefs[m];
                  rowXML += ' ss:MergeDown="' + (separatData.length - 1).toString() + '"';
                }
                rowXML += getStyleString(columnDefs[m].type, firstData[columnDefs[m].field]);
              }
              rowXML += '</Row>';

              for (var j = 1; j < separatData.length; j++) {
                rowXML += "<Row>";
                var isColumnAfterMergeColumn = false;
                for (var m = 0; m < columnDefs.length; m++) {
                  if (mergedColumnName == columnDefs[m]) {
                    isColumnAfterMergeColumn = true;
                  }
                  else {
                    rowXML += '<Cell';
                    if (isColumnAfterMergeColumn) {
                      rowXML += ' ss:Index="' + (m + 1).toString() + '"';
                      isColumnAfterMergeColumn = false;
                    }
                    rowXML += getStyleString(columnDefs[m].type, separatData[j][columnDefs[m].field]);
                  }
                }
                rowXML += '</Row>';
              }
            }
          }
        }
      }

      wrkbookXML += rowXML;
      wrkbookXML += '</Table><AutoFilter xmlns="urn:schemas-microsoft-com:office:excel" x:Range="R1C1:R22C' + columnDefs.length + '"></AutoFilter></Worksheet>';
    }
    wrkbookXML += '</Workbook>';

    return wrkbookXML;
  }

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

  common.showLoading = function () {
    var loading = document.getElementById("loadingContainer");
    if (loading) {
      loading.style.display = "block";
    }
  };

  common.hideLoading = function () {
    var loading = document.getElementById("loadingContainer");
    if (loading) {
      loading.style.display = "none";
    }
  };

  return common;
});