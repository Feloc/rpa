import app from './app.js' 
//import * as mqtt from 'async-mqtt'
//import clientMqtt, {connect} from './mqtt/connection.mqtt.js'
//import {createPool} from "./database/connection";// 20/01/24



//websocket
/* import {Server} from 'socket.io'
import http from 'http'

const server = http.createServer(app)

const io = new Server(server)
 


clientMqtt.on('connect', connect) */

//20/01   INICIO DE CONEXION A LA BASE DE DATOS 

/* poolDb.connect()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

process.on('SIGINT', async () => {
    try {
        await poolDb.close()
        console.log('conexion cerrada correctamente');
    } catch (error) {
        console.error('Error al cerrar la conexion ', error)
    }
    process.exit()
}) */
//

const tMax = []
const Vmax = []
let tMaxV = 0

/*io.on('connection', (socket) => {
    console.log(socket.id);
    clientMqtt.on('message', (topic, message) => {
        if (topic === 'he/corte2/hx3/t_turbina') {
            message = message.toString()
            message = parseFloat(message)
            tMax.push(message)
            tMaxV = MyMax(tMax)
            socket.emit('temp', message)
            socket.emit('tempMax', tMaxV)
        }
        if (topic === 'he/corte3/hx6/v_turbina') {
            message = message.toString()            
            socket.emit('nano33', message)
        }
        
    })
    
})*/
/* 
io.on('connection', (socket) => {
    console.log(socket.id);
    clientMqtt.on('message', (topic, message) => {
        if (topic === 'he/corte2/hx5/v_head') {
            message = message.toString()            
            socket.emit('nano33', message)
        }
        
    })
    
}) */

/*io.on('connection', (socket) => {
    console.log(socket.id);
    socket.emit('ping')

    socket.on('pong', ( ) => {
        console.log('pong');
    })
})*/


/*io.on('message', (message)=>{
    console.log('mensaje');
    console.log(message);
})*/

//const clientMqtt = connectionMqtt()



//app.set("view engine", "ejs")



app.listen(app.get('port'))
console.log("listen on port", app.get('port') );




let myarr = [1,2,3,5,6,4,1,2,8,9,6,7,8,4,5,6,2,20,15]


export const MyMax = (myarr)=>{
    var al = myarr.length;
    //console.log(al);
    let maximum = myarr[al-1];
    //console.log(maximum);
    while (al--){
        if(myarr[al] > maximum){
            maximum = myarr[al]
        }
    }
            return maximum;
}; 

export const MyMin = (myarr)=>{
    var al = myarr.length;
    //console.log(al);
    let minimum = myarr[al-1];
    //console.log(minimum);
    while (al--){
        if(myarr[al] < minimum){
            minimum = myarr[al]
        }
    }
            return minimum;
}; 




// 13/04 14:00

