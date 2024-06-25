console.log('Mostar acelerometro');
const socketAcc = io()

const ctx = document.getElementById('chartAcc')
const ctx1 = document.getElementById('chartGyr')

const valueX = document.getElementById('valueX')
const valueY = document.getElementById('valueY')
const valueZ = document.getElementById('valueZ')
const valueGX = document.getElementById('valueGX')
const valueGY = document.getElementById('valueGY')
const valueGZ = document.getElementById('valueGZ')



socketAcc.on('nano33', (data) => {
    console.log(data);
    data = JSON.parse(data)
    valueX.innerHTML = data.ACC_X
    valueY.innerHTML = data.ACC_Y
    valueZ.innerHTML = data.ACC_Z

    valueGX.innerHTML = data.GYR_X
    valueGY.innerHTML = data.GYR_Y
    valueGZ.innerHTML = data.GYR_Z
    
    const max_ax = data.ACC_X 
    max.innerHTML = max_ax

    chartAcc.data.datasets[0].data.push(data.ACC_X)
    chartAcc.data.datasets[1].data.push(data.ACC_Y)
    chartAcc.data.datasets[2].data.push(data.ACC_Z)
    chartAcc.data.labels.push(new Date().toLocaleTimeString())
    chartAcc.update('none')
    if ( chartAcc.data.datasets[0].data.length > 100) {
        chartAcc.data.datasets[0].data.shift() 
        chartAcc.data.datasets[1].data.shift() 
        chartAcc.data.datasets[2].data.shift() 
        chartAcc.data.labels.shift()
    }

    chartGyr.data.datasets[0].data.push(data.GYR_X)
    chartGyr.data.datasets[1].data.push(data.GYR_Y)
    chartGyr.data.datasets[2].data.push(data.GYR_Z)
    chartGyr.data.labels.push(new Date().toLocaleString())
    chartGyr.update('none')
    if ( chartGyr.data.datasets[0].data.length > 100) {
        chartGyr.data.datasets[0].data.shift() 
        chartGyr.data.datasets[1].data.shift() 
        chartGyr.data.datasets[2].data.shift() 
        chartGyr.data.labels.shift()
    }

    /* if (data.ACC_X > max_ax) {
        max_ax = data.ACC_X
        max.innerHTML = max_ax
    } */
}) 

const chartAcc = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [new Date().getHours()],
      datasets: [{
        label: 'X',
        data: [],
        borderWidth: 1,
        //borderColor: 'rgba(0, 0, 0, 0.1)'
      },
      {
        label: 'Y',
        data: [],
        borderWidth: 1
      },
      {
        label: 'Z',
        data: [],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }); 

  const chartGyr = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: [new Date().getHours()],
      datasets: [{
        label: 'X',
        data: [],
        borderWidth: 1
      },
      {
        label: 'Y',
        data: [],
        borderWidth: 1
      },
      {
        label: 'Z',
        data: [],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });