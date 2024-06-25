"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectPoolPC = connectPoolPC;
exports.createPool = createPool;
exports.getConnection = getConnection;
exports.poolPC = void 0;
Object.defineProperty(exports, "sql", {
  enumerable: true,
  get: function get() {
    return _mssql["default"];
  }
});
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mssql = _interopRequireWildcard(require("mssql"));
var _config = _interopRequireDefault(require("../config"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var dbsettings = {
  user: _config["default"].dbUser,
  password: _config["default"].dbPassword,
  server: _config["default"].dbServer,
  database: _config["default"].dbDatabase,
  options: {
    encrypt: true,
    // // Si estás utilizando una conexión segura, asegúrate de habilitar la opción "encrypt"
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

/* export const poolDb = new ConnectionPool(dbsettings)

poolDb.on('error', (err) => {
  console.error('Error en la conexión de la base de datos: ', err)
}) */

var poolPC = new _mssql.ConnectionPool(dbsettings);
exports.poolPC = poolPC;
function connectPoolPC() {
  return _connectPoolPC.apply(this, arguments);
}
function _connectPoolPC() {
  _connectPoolPC = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return poolPC.connect();
        case 3:
          console.log('Conexión establecida correctamente PC');
          _context.next = 9;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Error al conectar a la base de datos:', _context.t0);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _connectPoolPC.apply(this, arguments);
}
function createPool() {
  return _createPool.apply(this, arguments);
}
function _createPool() {
  _createPool = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var pool;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          pool = new _mssql.ConnectionPool(dbsettings);
          _context2.next = 4;
          return pool.connect();
        case 4:
          return _context2.abrupt("return", pool);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _createPool.apply(this, arguments);
}
function getConnection() {
  return _getConnection.apply(this, arguments);
}
function _getConnection() {
  _getConnection = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var pool;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _mssql["default"].connect(dbsettings);
        case 3:
          pool = _context3.sent;
          return _context3.abrupt("return", pool);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _getConnection.apply(this, arguments);
}
/*import { Connection } from "tedious";
import { Request } from "tedious";


// Create connection to database
const config = {
    server: 'localhost', //WSML103136\SQLEXPRESS
    authentication: {
        type: 'default',
        options: {
            userName: 'foc', // update me feloc
            password: 'Foc2486' // update me
        }
    },
    options: {
        database: 'he',
        trustServerCertificate: true //**AGREGADO
    }
  }
  
export function getConnectionSql(){
  const pool = new Connection(config);
  return pool
  //connectSql.connect()
} 


  connectSql.on('connect', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected SQL SERVER HE');
    }
  });
  
connectSql.connect()*/