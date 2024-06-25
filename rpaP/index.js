"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyMin = exports.MyMax = void 0;
var _app = _interopRequireDefault(require("./app"));
var mqtt = _interopRequireWildcard(require("async-mqtt"));
var _connection = _interopRequireWildcard(require("./mqtt/connection.mqtt"));
var _socket = require("socket.io");
var _http = _interopRequireDefault(require("http"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//import {createPool} from "./database/connection";// 20/01/24

//websocket

var server = _http["default"].createServer(_app["default"]);
var io = new _socket.Server(server);
_connection["default"].on('connect', _connection.connect);

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

var tMax = [];
var Vmax = [];
var tMaxV = 0;

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

io.on('connection', function (socket) {
  console.log(socket.id);
  _connection["default"].on('message', function (topic, message) {
    if (topic === 'he/corte2/hx5/v_head') {
      message = message.toString();
      socket.emit('nano33', message);
    }
  });
});

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

server.listen(_app["default"].get('port'));
console.log("listen on port", _app["default"].get('port'));
var myarr = [1, 2, 3, 5, 6, 4, 1, 2, 8, 9, 6, 7, 8, 4, 5, 6, 2, 20, 15];
var MyMax = function MyMax(myarr) {
  var al = myarr.length;
  //console.log(al);
  var maximum = myarr[al - 1];
  //console.log(maximum);
  while (al--) {
    if (myarr[al] > maximum) {
      maximum = myarr[al];
    }
  }
  return maximum;
};
exports.MyMax = MyMax;
var MyMin = function MyMin(myarr) {
  var al = myarr.length;
  //console.log(al);
  var minimum = myarr[al - 1];
  //console.log(minimum);
  while (al--) {
    if (myarr[al] < minimum) {
      minimum = myarr[al];
    }
  }
  return minimum;
};

// 13/04 14:00
exports.MyMin = MyMin;