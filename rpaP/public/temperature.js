"use strict";

var socketTemp = io();

//import Chart from "chart.js";
var thx3 = document.getElementById('thx3');
var tMaxima = document.getElementById('tMaxima');
var ctx = document.getElementById('tempTurbine');
socketTemp.on('temp', function (data) {
  console.log('prueba');
  thx3.innerHTML = data;
});
socketTemp.on('tempMax', function (data) {
  tMaxima.innerHTML = data;
});
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: '°C',
      data: [],
      borderWidth: 1
      //borderColor: 'rgba(0, 0, 0, 0.1)'
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
socketTemp.on('temp', function (data) {
  console.log('chart');
  data = JSON.parse(data);
  var x = data;
  myChart.data.datasets[0].data.push(x);
  myChart.data.labels.push(new Date().toLocaleTimeString());
  myChart.update('none');
  if (myChart.data.datasets[0].data.length > 100) {
    myChart.data.datasets[0].data.shift();
    myChart.data.labels.shift();
  }
});