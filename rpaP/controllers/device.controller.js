"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.temperatureChart = exports.insertTemperature = exports.getTemperatureChart = exports.getTemperature = exports.getAccelerometerChart = exports.deviceAccGetChart = exports.accelerometerChart = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _database = require("../database");
var _connection = _interopRequireDefault(require("../mqtt/connection.mqtt"));
var _index = require("../index.js");
var _bot = _interopRequireWildcard(require("../telegram/bot.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//import { ser } from "socket.io";

var poolPromise = (0, _database.createPool)();

/*io.on('message', (message)=>{
        //res.render('deviceTemp', {temp: message})//se pasa el archivo sin extension ejs
    })*/

/*io.on('message', (message) => {
    console.log(message);
})*/

var getTemperature = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result, keys;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('mqtt');
          _context.prev = 1;
          _context.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context.sent;
          _context.next = 7;
          return pool.request().query(_database.queries.getTempTurbine);
        case 7:
          result = _context.sent;
          keys = Object.keys(result.recordset.columns);
          /*result.recordset.forEach((data) => {
              keys.forEach(key => {
                  console.log(data[key]);
                  const values = data[key]
              })
            });*/
          //res.json(result.recordset)
          res.render('deviceTemp', {
            data: result.recordset,
            data1: keys
          }); //se pasa el archivo sin extension ejs
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          res.status(500);
          res.send(_context.t0.message);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function getTemperature(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getTemperature = getTemperature;
var getTemperatureChart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, result, keys;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return pool.request().query(_database.queries.getTempTurbine);
        case 6:
          result = _context2.sent;
          keys = Object.keys(result.recordset.columns);
          return _context2.abrupt("return", res.json(result.recordset));
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500);
          res.send(_context2.t0.message);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function getTemperatureChart(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getTemperatureChart = getTemperatureChart;
var temperatureChart = function temperatureChart(req, res) {
  res.render('deviceTempDb');
  //res.send('holita')
};

//INSERCION EN LA BASE DE DATOS 

/*clientMqtt.on('message', async (topic, message) => {
    message = message.toString()

    if (topic === 'he/corte2/hx3/t_turbina') {

        console.log('Insertando Temp a la base de datos')
        console.log(message)


        try {
            const pool = await getConnection()
            
            await pool
            .request()
            .input('temp', sql.VarChar, message)
            //.input('startTime', sql.DateTime, new Date())
            //.input('endTime', sql.DateTime, new Date())
            .input('time', sql.DateTime, new Date())
            .query(queries.insertTempTurbine)
        } catch (error) {
            console.log(error);
            //res.status(500)
            //res.send(error.message)
        }
    }

    if (topic === 'he/corte3/hx6/v_turbina') {
        console.log('Insertando Acc a la base de datos')
        message = JSON.parse(message)

        let acc_x = message.ACC_X
        let acc_y = message.ACC_Y
        let acc_z = message.ACC_Z
        let gyr_x  = message.GYR_X
        let gyr_y = message.GYR_Y
        let gyr_z = message.GYR_Z

        try {
            const pool = await getConnection()
            await pool
            .request()
            .input('acc_x', sql.Float, acc_x)
            .input('acc_y', sql.Float, acc_y)
            .input('acc_z', sql.Float, acc_z)
            .input('gyr_x', sql.Float, gyr_x)
            .input('gyr_y', sql.Float, gyr_y)
            .input('gyr_z', sql.Float, gyr_z)
            .input('time', sql.DateTime, new Date())
            .query(queries.insertAccTurbine)
        } catch (error) {
            console.log(error)
            //res.status(500)
            //res.send(error.message)
        }
    }
    

})
*/

//INSERTAR ACELERACION HEAD
exports.temperatureChart = temperatureChart;
var acc_x_array = [];
var acc_y_array = [];
var acc_z_array = [];
var AcyCount = 0;
_connection["default"].on('message', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(topic, message) {
    var acc_x, acc_y, acc_z, gyr_x, gyr_y, gyr_z, acc_x_max, acc_x_min, acc_y_max, acc_y_min, acc_z_max, acc_z_min, pool;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //try {
          message = message.toString();
          //console.log(message);
          try {
            message = JSON.parse(message, function (key, value) {
              //console.log(typeof value);
              //value.toString()
              if (typeof value === 'string') {
                console.log('cambiado');
                return value.replace(/[^0-9.]/g, '');
              }
              return value;
            });
          } catch (error) {
            console.error('Error al analizar la cadena JSON:', error.message);
            console.error('Cadena JSON problemática:', message);
          }
          if (!(topic === 'he/corte2/hx5/v_head')) {
            _context3.next = 26;
            break;
          }
          //console.log('Insertando Acc_Head a la base de datos')
          acc_x = message.ACC_X;
          acc_x_array.push(acc_x);
          acc_y = message.ACC_Y;
          acc_y_array.push(acc_y);
          acc_z = message.ACC_Z; //parseFloat(message.ACC_Z.toString().replace(/[^0-9.]/g, '')).toFixed(3);
          acc_z_array.push(acc_z);

          //console.log(acc_x, acc_y, acc_z);
          gyr_x = message.GYR_X;
          gyr_y = message.GYR_Y;
          gyr_z = message.GYR_Z;
          _context3.prev = 12;
          if (!(acc_y >= 15 /* && (acc_y - 15) % 5 <= 2 */)) {
            _context3.next = 20;
            break;
          }
          AcyCount++;
          console.log(AcyCount);
          if (!(AcyCount === 1)) {
            _context3.next = 20;
            break;
          }
          _context3.next = 19;
          return _bot["default"].telegram.sendMessage(_bot.chat_id, 'AcY  ' + acc_y);
        case 19:
          console.log('AcY ', acc_y);
        case 20:
          if (acc_y < 15) {
            AcyCount = 0;
          }
          _context3.next = 26;
          break;
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](12);
          console.error('Error de red:', _context3.t0);
        case 26:
          if (!(acc_x_array.length === 1000)) {
            _context3.next = 60;
            break;
          }
          acc_x_max = (0, _index.MyMax)(acc_x_array);
          acc_x_min = (0, _index.MyMin)(acc_x_array);
          acc_y_max = (0, _index.MyMax)(acc_y_array);
          acc_y_min = (0, _index.MyMin)(acc_y_array);
          acc_z_max = (0, _index.MyMax)(acc_z_array);
          acc_z_min = (0, _index.MyMin)(acc_z_array);
          console.log('X max', (0, _index.MyMax)(acc_x_array));
          console.log('X min', (0, _index.MyMin)(acc_x_array));
          console.log('Y max', (0, _index.MyMax)(acc_y_array));
          console.log('Y min', (0, _index.MyMin)(acc_y_array));
          console.log('Z max', (0, _index.MyMax)(acc_z_array));
          console.log('Z min', (0, _index.MyMin)(acc_z_array));
          _context3.prev = 39;
          _context3.next = 42;
          return poolPromise;
        case 42:
          pool = _context3.sent;
          if (!pool) {
            _context3.next = 51;
            break;
          }
          console.log('Insertando en la base de datos');
          _context3.next = 47;
          return pool.request().input('acc_x', _database.sql.Float, acc_x_max).input('acc_y', _database.sql.Float, acc_y_max).input('acc_z', _database.sql.Float, acc_z_max)
          /* .input('gyr_x', sql.Float, gyr_x)
          .input('gyr_y', sql.Float, gyr_y)
          .input('gyr_z', sql.Float, gyr_z) */.input('time', _database.sql.DateTime, new Date()).query(_database.queries.insertAccHeadHX3);
        case 47:
          _context3.next = 49;
          return pool.request().input('acc_x', _database.sql.Float, acc_x_min).input('acc_y', _database.sql.Float, acc_y_min).input('acc_z', _database.sql.Float, acc_z_min).input('time', _database.sql.DateTime, new Date()).query(_database.queries.insertAccHeadHX3);
        case 49:
          _context3.next = 52;
          break;
        case 51:
          console.log('no connection');
        case 52:
          _context3.next = 57;
          break;
        case 54:
          _context3.prev = 54;
          _context3.t1 = _context3["catch"](39);
          console.log(_context3.t1);
        case 57:
          acc_x_array = [];
          acc_y_array = [];
          acc_z_array = [];
        case 60:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[12, 23], [39, 54]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var insertTemperature = function insertTemperature(req, res) {
  res.send('insertando');
  _connection["default"].on('message', function (topic, message) {
    message = message.toString;
    console.log(message);
    console.log('message');
  });

  //validacion tosca, se puede hacer con bibliotecas
  /*if (temp == null || tempe == null) {
      return res.status(400).json({msg : 'Bad request. Faltan datos'})
  }
  if (noDato == null) noDato = 0; //si no hay dato queda por defecto en 0
    try {//hay mejores formas de validar el error, este es un ejemplo.
      const pool = await getConnection()
      await pool
      .request()
      .input('temp', sql.VarChar, temp)
      .query(queries.addEquipment)
        console.log(temp, tempe, noDato);
      res.json({temp})
  } catch (error) {
      res.status(500)
      res.send(error.message)    
  }*/
};

//ACCELEROMETER
exports.insertTemperature = insertTemperature;
var deviceAccGetChart = function deviceAccGetChart(req, res) {
  res.render('deviceAcc');
};
exports.deviceAccGetChart = deviceAccGetChart;
var accelerometerChart = function accelerometerChart(req, res) {
  res.render('deviceAccDb');
};
exports.accelerometerChart = accelerometerChart;
var getAccelerometerChart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return pool.request().query(_database.queries.getAccHeadHX3);
        case 6:
          result = _context4.sent;
          return _context4.abrupt("return", res.json(result.recordset));
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          res.status(500);
          res.send(_context4.t0.message);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function getAccelerometerChart(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getAccelerometerChart = getAccelerometerChart;