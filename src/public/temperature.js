const socketTemp = io()

//import Chart from "chart.js";
const thx3 = document.getElementById('thx3')
const tMaxima = document.getElementById('tMaxima');

const ctx = document.getElementById('tempTurbine');


socketTemp.on('temp', (data) => {
    console.log('prueba');

    thx3.innerHTML = data
})

socketTemp.on('tempMax', (data) => {
    tMaxima.innerHTML = data
})


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '°C',
        data: [],
        borderWidth: 1,
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

socketTemp.on('temp', (data) => {
    console.log('chart');
    data = JSON.parse(data)
    let x = data

    myChart.data.datasets[0].data.push(x)
    myChart.data.labels.push(new Date().toLocaleTimeString())
    myChart.update('none')
    if ( myChart.data.datasets[0].data.length > 100) {
        myChart.data.datasets[0].data.shift() 
        myChart.data.labels.shift()
    }
})
