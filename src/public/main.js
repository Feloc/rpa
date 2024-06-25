//este es el cliente

//toma un parametro que es la conexion de websocket  'http://localhost:3000' paro como io se esta sirviendo desde el mismo localhost:3000 al estar vacio se intenta conectar al mismo servidor de donde fue servido 
    //io lo que devuelve es un objeto que es la conexion del servidor
const socket = io()//ahora por el objeto socket puedo escuchar todos los eventos que me envie el servidor
//import fetch from "node-fetch";


const datos = {
    datata : []
}

socket.on('ping', () => {
    console.log('escuchado');
    socket.emit('pong')
})

/*const getDataToChart =  (req, res) =>{
    fetch('/deviceTempChart')
        .then(console.log('hola'))
        .then(console.log(req))
        //.then(console.log(res.data))
        .then(data => data.json)
        //.then(console.log(data))
        //.then(res => datos.datata = res.data)
}*/

//const response = await fetch('https://swapi.dev/api/people/1/')
/*const response = await fetch('/deviceTempChart')
const data =await response.json()


console.log(data[0]);*/
    


//alert('hola')
//getDataToChart()