"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ctx = document.getElementById('accHeadX');
//const ctx1 = document.getElementById('gyrTurbine');
var ctx1 = document.getElementById('accHeadY');
var ctx2 = document.getElementById('accHeadZ');
var response = await fetch('/deviceAccChart');
var dataAcc = await response.json();
var dataX = [];
var dataY = [];
var dataZ = [];
var datagX = [];
var datagY = [];
var datagZ = [];
var labels = [];
var _iterator = _createForOfIteratorHelper(dataAcc),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var iterator = _step.value;
    dataX.push(parseFloat(iterator.acc_x));
    dataY.push(parseFloat(iterator.acc_y));
    dataZ.push(parseFloat(iterator.acc_z));
    datagX.push(parseFloat(iterator.gyr_x));
    datagY.push(parseFloat(iterator.gyr_y));
    datagZ.push(parseFloat(iterator.gyt_z));
    labels.push(iterator.time);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
console.log(dataX.length);
console.log(dataX.slice(-200));
var chartAccHeadX = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels.slice(-1000),
    datasets: [{
      label: 'X/ms2',
      data: dataX.slice(-1000),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

/*if (chartAccHeadX) {
  chartAccHeadX.destroy()
}*/

var chartAccHeadY = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: labels.slice(-1000),
    datasets: [{
      label: 'Y/ms2',
      data: dataY.slice(-1000),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});
var chartAccHeadZ = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: labels.slice(-1000),
    datasets: [{
      label: 'Z/ms2',
      data: dataZ.slice(-1000),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

/*const chartGyr = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'X',
      data: datagX,
      borderWidth: 1
    },
    {
      label: 'Y',
      data: datagY,
      borderWidth: 1
    },
    {
      label: 'Z',
      data: datagZ,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});*/