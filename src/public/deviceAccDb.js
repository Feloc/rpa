const ctx = document.getElementById('accHeadX');
//const ctx1 = document.getElementById('gyrTurbine');
const ctx1 = document.getElementById('accHeadY');
const ctx2 = document.getElementById('accHeadZ');

const response = await fetch('/deviceAccChart')
const dataAcc = await response.json()


const dataX = [] 
const dataY = [] 
const dataZ = [] 
const datagX = []
const datagY = []
const datagZ = []
const labels = []

for (const iterator of dataAcc) {
  dataX.push(parseFloat(iterator.acc_x))
  dataY.push(parseFloat(iterator.acc_y))
  dataZ.push(parseFloat(iterator.acc_z))
  datagX.push(parseFloat(iterator.gyr_x))
  datagY.push(parseFloat(iterator.gyr_y))
  datagZ.push(parseFloat(iterator.gyt_z))
  labels.push(iterator.time)
}

console.log(dataX.length);
console.log(dataX.slice(-200));


const chartAccHeadX = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.slice(-1000),
      datasets: [
        {
        label: 'X/ms2',
        data: dataX.slice(-1000),
        borderWidth: 1,
      }
      ]
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

const chartAccHeadY = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: labels.slice(-1000),
    datasets: [
    {
      label: 'Y/ms2',
      data: dataY.slice(-1000),
      borderWidth: 1
    }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
}); 


const chartAccHeadZ = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: labels.slice(-1000),
    datasets: [
    {
      label: 'Z/ms2',
      data: dataZ.slice(-1000),
      borderWidth: 1
    }
    ]
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