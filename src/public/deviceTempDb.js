const ctx = document.getElementById('tempTurbine');

const response = await fetch('/deviceTempChart')
const dataTemp =await response.json()


//console.log(data);

const data = [] 
const labels = []

for (const iterator of dataTemp) {
  data.push(parseFloat(iterator.temp))
  labels.push(iterator.time)
}

const chartTemp = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '°C',
        data: data,
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


/*for (const iterator of data) {
  chartTemp.data.datasets[0].data.push(parseFloat(iterator.temp))
  chartTemp.data.labels.push(iterator.time)
}

console.log(chartTemp.data.datasets[0].data);
console.log(chartTemp.data.labels);*/
