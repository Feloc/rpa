"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEquipmentById = exports.getTotalEquipment = exports.getEquipmentById = exports.getEquipment = exports.editEquipment = exports.deleteEquipmentById = exports.deleteEquipment = exports.createEquipment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getEquipment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().query(_database.queries.getAllEquipments);
        case 6:
          result = _context.sent;
          console.log(result);
          res.json(result.recordset);
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send(_context.t0.message);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function getEquipment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getEquipment = getEquipment;
var createEquipment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, temp, tempe, noDato, pool;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, temp = _req$body.temp, tempe = _req$body.tempe; //recibir los datos que quiero rebir como constante
          noDato = req.body.noDato; //los que quiero recibir como variables
          //validacion tosca, se puede hacer con bibliotecas
          if (!(temp == null || tempe == null)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            msg: 'Bad request. Faltan datos'
          }));
        case 4:
          if (noDato == null) noDato = 0; //si no hay dato queda por defecto en 0
          _context2.prev = 5;
          _context2.next = 8;
          return (0, _database.getConnection)();
        case 8:
          pool = _context2.sent;
          _context2.next = 11;
          return pool.request().input('temp', _database.sql.VarChar, temp).query(_database.queries.addEquipment);
        case 11:
          console.log(temp, tempe, noDato);
          res.json({
            temp: temp
          });
          _context2.next = 19;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](5);
          res.status(500);
          res.send(_context2.t0.message);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 15]]);
  }));
  return function createEquipment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createEquipment = createEquipment;
var getEquipmentById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context3.sent;
          _context3.next = 6;
          return pool.request().input('Id', id).query(_database.queries.getEquipmentById);
        case 6:
          result = _context3.sent;
          //console.log(result);
          res.send(result.recordset[0]);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getEquipmentById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getEquipmentById = getEquipmentById;
var deleteEquipmentById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return pool.request().input('Id', id).query(_database.queries.deletEquipmentById);
        case 6:
          result = _context4.sent;
          //console.log(result);
          res.sendStatus(204); //significa que ha sido correcto el rango del 200 significa que le respuesta fue correcta
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function deleteEquipmentById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteEquipmentById = deleteEquipmentById;
var getTotalEquipment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.getConnection)();
        case 2:
          pool = _context5.sent;
          _context5.next = 5;
          return pool.request().query(_database.queries.getTotalEquipment);
        case 5:
          result = _context5.sent;
          //console.log(result);
          res.sendStatus(204); //significa que ha sido correcto el rango del 200 significa que le respuesta fue correcta
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getTotalEquipment(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getTotalEquipment = getTotalEquipment;
var updateEquipmentById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var temp, id, pool, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          temp = req.body.temp;
          id = req.params.id;
          if (!(temp == null)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            msg: 'Bad request. Faltan datos'
          }));
        case 4:
          _context6.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context6.sent;
          _context6.next = 9;
          return pool.request().input('temp', _database.sql.VarChar, temp)
          //.input() si se tienen mas datos para modificar
          .input('Id', id).query(_database.queries.updateEquipmentById);
        case 9:
          result = _context6.sent;
          res.json({
            temp: temp
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateEquipmentById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateEquipmentById = updateEquipmentById;
var editEquipment = function editEquipment(req, res) {
  res.send('equipo editado');
};
exports.editEquipment = editEquipment;
var deleteEquipment = function deleteEquipment(req, res) {
  res.send('equipo borrado');
};
exports.deleteEquipment = deleteEquipment;