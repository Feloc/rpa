"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.poolPC = exports.connectPoolPC = void 0;
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
  port: parseInt(_config["default"].dbPort, 10) || 1433,
  database: _config["default"].dbDatabase,
  options: {
    encrypt: true,
    // // Si estás utilizando una conexión segura, asegúrate de habilitar la opción "encrypt"
    trustServerCertificate: true,
    // change to true for local dev / self-signed certs
    connectionTimeout: 30000,
    // Incrementa el tiempo de espera de conexión a 30 segundos
    requestTimeout: 30000 //
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
    //connectionTimeout: 30000, // Incrementa el tiempo de espera de conexión
    //requestTimeout: 30000 // Incrementa el tiempo de espera de las solicitudes
  }
};

/* export const poolDb = new ConnectionPool(dbsettings)

poolDb.on('error', (err) => {
  console.error('Error en la conexión de la base de datos: ', err)
}) */

var poolPC;
exports.poolPC = poolPC;
var connectPoolPC = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return new _mssql.ConnectionPool(dbsettings).connect();
        case 3:
          exports.poolPC = poolPC = _context.sent;
          console.log('Conexión establecida correctamente PC');
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error al conectar a la base de datos:', _context.t0);
          setTimeout(connectPoolPC, 5000); // Reintentar la conexión después de 5 segundos
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function connectPoolPC() {
    return _ref.apply(this, arguments);
  };
}();

/*export const poolPC = new ConnectionPool(dbsettings)

 export async function connectPoolPC() {
  try {
    await poolPC.connect()
    console.log('Conexión establecida correctamente PC');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

export async function createPool() {
  try {
    const pool = new ConnectionPool(dbsettings)
    await pool.connect()
    return pool
  } catch (error) {
    console.error(error);
  }
  
}


export async function getConnection() {
  try {
    const pool = await sql.connect(dbsettings)
    return pool  
  } catch (error) {
    console.error(error);
  }
  
} */

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
exports.connectPoolPC = connectPoolPC;