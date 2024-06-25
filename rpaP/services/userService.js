"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByPassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* export const getUserByPassword = async (password) => {
    try {
        const result = await poolPC
        .request()
        .query(queries.getUsers)

        const users = result.recordset

        for (let user of users) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return user;
            }
        }

        return null
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
} */

var getUserByPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var result, users, _iterator, _step, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _database.poolPC.request().query(_database.queries.getUsers);
        case 3:
          result = _context.sent;
          users = result.recordset;
          _iterator = _createForOfIteratorHelper(users);
          _context.prev = 6;
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context.next = 14;
            break;
          }
          user = _step.value;
          if (!(password == user.pass)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", user);
        case 12:
          _context.next = 8;
          break;
        case 14:
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](6);
          _iterator.e(_context.t0);
        case 19:
          _context.prev = 19;
          _iterator.f();
          return _context.finish(19);
        case 22:
          _context.next = 28;
          break;
        case 24:
          _context.prev = 24;
          _context.t1 = _context["catch"](0);
          console.error('Error fetching user:', _context.t1);
          throw _context.t1;
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24], [6, 16, 19, 22]]);
  }));
  return function getUserByPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUserByPassword = getUserByPassword;