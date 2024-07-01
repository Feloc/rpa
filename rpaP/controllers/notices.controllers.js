"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImages = exports.updateUsers = exports.updateNotice = exports.putNoticeUser = exports.noticesUser_User = exports.noticesHistory = exports.noticesDetail = exports.notices = exports.getUsers = exports.getNotices = exports.getNoticeById = exports.getImages = exports.exitUserNotice = exports.createNotice = exports.closeNotice = exports.addUserNotice = exports.acceptNotice = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _database = require("../database");
var _sharp = _interopRequireDefault(require("sharp"));
var _path = _interopRequireDefault(require("path"));
var _expressValidator = require("express-validator");
var _dateFns = require("date-fns");
var _userService = require("../services/userService.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
//solo si se utiliza el servicio de validacion   

//const poolPromise = createPool()

//User
var getUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _database.poolPC.request().query(_database.queries.getUsers);
        case 3:
          result = _context.sent;
          return _context.abrupt("return", res.json({
            users: result
          }));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500);
          res.send(_context.t0.message);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUsers = getUsers;
var updateUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _id;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _id = req.body.id;
          _context2.next = 4;
          return _database.poolPC.request().input('status', _database.sql.VarChar, 'active').query(_database.queries.updateUsers);
        case 4:
          _context2.next = 11;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500);
          res.send(_context2.t0.message);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function updateUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//Notices
exports.updateUsers = updateUsers;
var getNotices = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _database.poolPC.request().query(_database.queries.getNotices);
        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", res.json(result.recordset));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500);
          res.send(_context3.t0.message);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getNotices(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getNotices = getNotices;
var getNoticeById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _database.poolPC.request().input('id', _database.sql.Int, id).query(_database.queries.getNoticeById);
        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", res.json(result.recordset));
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500);
          res.send(_context4.t0.message);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getNoticeById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getNoticeById = getNoticeById;
var notices = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var result, result1, keys, pool, pool1, unAcceptedNotices;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log(_database.poolPC);
          //if (!poolPC._connected) {
          //console.log('NO CONNECTION');
          //result = {recordset:[]}       
          //}else{
          _context5.next = 4;
          return _database.poolPC;
        case 4:
          pool = _context5.sent;
          _context5.next = 7;
          return pool.request().query(_database.queries.getEquipment);
        case 7:
          result = _context5.sent;
          _context5.next = 10;
          return _database.poolPC;
        case 10:
          pool1 = _context5.sent;
          _context5.next = 13;
          return pool.request().query(_database.queries.getNotices);
        case 13:
          result1 = _context5.sent;
          keys = Object.keys(result1.recordset.columns);

          //}
          console.log(result.recordset);
          unAcceptedNotices = result1.recordset.filter(function (item) {
            return item.status == 1;
          });
          res.render('notices', {
            data: result.recordset,
            unAcceptedNotices: unAcceptedNotices,
            keys: keys
          });
          _context5.next = 24;
          break;
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          console.error('Primer error', _context5.t0);
          res.status(500).send(_context5.t0.message);
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 20]]);
  }));
  return function notices(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.notices = notices;
var createNotice = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, equipment, event, pass, user, status, regtime;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body = req.body, equipment = _req$body.equipment, event = _req$body.event, pass = _req$body.pass;
          console.log(pass);

          // Validar la contraseña
          _context6.next = 5;
          return (0, _userService.getUserByPassword)(pass);
        case 5:
          user = _context6.sent;
          console.log(user);
          if (user) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.render('error', {
            error: 'Invalid password.'
          }));
        case 9:
          status = 1;
          regtime = new Date();
          console.log(equipment, event, regtime);

          /* if (pass.length != 4) {
              return res.render('error', { error: 'Password must be 4 characters long.' });
          }
            const users = await poolPC
              .request()
              .query(queries.getUsers)
              let matchingUser = null
          
          for (const user of users.recordset) {
              if (user.pass == pass) {
                  matchingUser = user
                  break
              }
          }
            console.log(matchingUser);
            // Handle no matching user
          if (!matchingUser) {
              return res.render('error', { error: 'Invalid password.' }); //return res.status(400).json({ error: 'Invalid password.' });
          } */
          _context6.next = 14;
          return _database.poolPC.request().input('status', _database.sql.Int, status).input('machine', _database.sql.VarChar, equipment).input('message', _database.sql.VarChar, event).input('regtime', _database.sql.DateTime, regtime).input('requester', _database.sql.Int, user.id).query(_database.queries.createNotice);
        case 14:
          res.redirect('/notices');
          _context6.next = 21;
          break;
        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).send(_context6.t0.message);
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 17]]);
  }));
  return function createNotice(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//Consider using libraries like mssql/promise for a more streamlined asynchronous handling of database queries.
//Prepared Statements (Optional):
//Consider using prepared statements for both the SELECT and UPDATE queries to enhance security and prevent SQL injection vulnerabilities.
exports.createNotice = createNotice;
var acceptNotice = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pass, id_notice, notice_status, starttime, users, matchingUser, _iterator, _step, user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          pass = req.body.pass;
          id_notice = req.params.id_notice;
          console.log(id_notice);
          notice_status = 2;
          starttime = new Date();
          console.log(pass.length);
          _context7.prev = 6;
          if (!(pass.length != 4)) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.render('error', {
            error: 'Password must be 4 characters long.'
          }));
        case 9:
          _context7.next = 11;
          return _database.poolPC.request().query(_database.queries.getUsers);
        case 11:
          users = _context7.sent;
          matchingUser = null;
          _iterator = _createForOfIteratorHelper(users.recordset);
          _context7.prev = 14;
          _iterator.s();
        case 16:
          if ((_step = _iterator.n()).done) {
            _context7.next = 23;
            break;
          }
          user = _step.value;
          if (!(user.pass == pass)) {
            _context7.next = 21;
            break;
          }
          matchingUser = user;
          return _context7.abrupt("break", 23);
        case 21:
          _context7.next = 16;
          break;
        case 23:
          _context7.next = 28;
          break;
        case 25:
          _context7.prev = 25;
          _context7.t0 = _context7["catch"](14);
          _iterator.e(_context7.t0);
        case 28:
          _context7.prev = 28;
          _iterator.f();
          return _context7.finish(28);
        case 31:
          if (matchingUser) {
            _context7.next = 33;
            break;
          }
          return _context7.abrupt("return", res.render('error', {
            error: 'Invalid password.'
          }));
        case 33:
          if (!(matchingUser.status !== 'inactive')) {
            _context7.next = 35;
            break;
          }
          return _context7.abrupt("return", res.render('error', {
            error: 'Ya estas registrado en un Aviso'
          }));
        case 35:
          _context7.prev = 35;
          _context7.next = 38;
          return _database.poolPC.request().input('id', _database.sql.Int, id_notice).input('status', _database.sql.Int, notice_status).input('starttime', _database.sql.DateTime, starttime).input('technician', _database.sql.VarChar, matchingUser.name + ' ' + matchingUser.lastname).query(_database.queries.updateNotice);
        case 38:
          _context7.next = 40;
          return _database.poolPC.request().input('id', _database.sql.Int, matchingUser.id).input('status', _database.sql.VarChar, 'active').query(_database.queries.updateUsers);
        case 40:
          _context7.next = 42;
          return _database.poolPC.request().input('id_user', _database.sql.Int, matchingUser.id).input('id_notice', _database.sql.Int, id_notice).input('starttime', _database.sql.DateTime, starttime).query(_database.queries.insertNoticeUser);
        case 42:
          /* axios.post('/putNoticeUser', {
              id_user: matchingUser.id,
              id_notice: id_notice,
              starttime: starttime
          }) */

          //await poolPC.transaction().commit()
          console.log('Aviso aceptado correctamente');
          res.redirect('/notices');
          _context7.next = 50;
          break;
        case 46:
          _context7.prev = 46;
          _context7.t1 = _context7["catch"](35);
          //await poolPC.transaction().rollback(); // Rollback on error
          console.error('Error updating notice and user:', _context7.t1);
          res.status(500).json({
            error: 'Internal server error (notice/user update).'
          });
        case 50:
          _context7.next = 56;
          break;
        case 52:
          _context7.prev = 52;
          _context7.t2 = _context7["catch"](6);
          console.error('Unexpected error:', _context7.t2);
          res.status(500).json({
            error: 'Internal server error.'
          });
        case 56:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[6, 52], [14, 25, 28, 31], [35, 46]]);
  }));
  return function acceptNotice(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.acceptNotice = acceptNotice;
var closeNotice = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var description, id_notice, notice_status, endtime, _result$recordset$fil, _result$recordset$fil2, result, noticeUserFilter;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          description = req.body.description;
          id_notice = req.params.id_notice;
          notice_status = 3;
          endtime = new Date();
          console.log(description, id_notice, endtime);
          _context10.prev = 5;
          _context10.next = 8;
          return _database.poolPC.request().input('id', _database.sql.Int, id_notice).input('status', _database.sql.Int, notice_status).input('endtime', _database.sql.DateTime, endtime).input('description', _database.sql.Text, description).query(_database.queries.updateNoticeClosed);
        case 8:
          _context10.next = 10;
          return _database.poolPC.request().query(_database.queries.getNoticeUserFilter);
        case 10:
          result = _context10.sent;
          noticeUserFilter = (_result$recordset$fil = result.recordset.filter(function (item) {
            return item.id == id_notice && item.endtime === null;
          }), _result$recordset$fil2 = (0, _slicedToArray2["default"])(_result$recordset$fil, 0), _result$recordset$fil); //console.log(result.recordset);
          console.log(noticeUserFilter);
          //console.log(noticeUserFilter.length);

          noticeUserFilter.map( /*#__PURE__*/function () {
            var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(item) {
              var endTime;
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    endTime = new Date();
                    console.log(item.user_id);
                    console.log(item.id);
                    _context8.next = 5;
                    return _database.poolPC.request().input('endtime', _database.sql.DateTime, endTime).input('id_user', _database.sql.Int, item.user_id).input('id_notice', _database.sql.Int, item.id).query(_database.queries.updateNoticesUser);
                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x17) {
              return _ref9.apply(this, arguments);
            };
          }());
          noticeUserFilter.map( /*#__PURE__*/function () {
            var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(item) {
              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    console.log('item id ' + item.user_id);
                    _context9.next = 3;
                    return _database.poolPC.request().input('id', _database.sql.Int, item.user_id).query(_database.queries.updateUsersAll);
                  case 3:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function (_x18) {
              return _ref10.apply(this, arguments);
            };
          }());
          res.redirect('/notices');
          _context10.next = 22;
          break;
        case 18:
          _context10.prev = 18;
          _context10.t0 = _context10["catch"](5);
          console.error('Unexpected error:', _context10.t0);
          res.status(500).json({
            error: 'Internal server error.'
          });
        case 22:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[5, 18]]);
  }));
  return function closeNotice(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.closeNotice = closeNotice;
var updateNotice = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var description, id_notice;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          description = req.body.description;
          id_notice = req.params.id_notice;
          console.log(description);
          _context11.next = 6;
          return _database.poolPC.request().input('id', _database.sql.Int, id_notice).input('description', _database.sql.Text, description).query(_database.queries.updateNoticeDescription);
        case 6:
          res.redirect("/noticesDetail/".concat(id_notice));
          _context11.next = 13;
          break;
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.error('Unexpected error:', _context11.t0);
          res.status(500).json({
            error: 'Internal server error.'
          });
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return function updateNotice(_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();
exports.updateNotice = updateNotice;
var addUserNotice = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var pass, id_notice, starttime, users, matchingUser, _iterator2, _step2, user;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          pass = req.body.pass;
          id_notice = req.params.id_notice;
          starttime = new Date();
          _context12.prev = 3;
          if (!(pass.length != 4)) {
            _context12.next = 6;
            break;
          }
          return _context12.abrupt("return", res.render('error', {
            error: 'Password must be 4 characters long.'
          }));
        case 6:
          _context12.next = 8;
          return _database.poolPC.request().query(_database.queries.getUsers);
        case 8:
          users = _context12.sent;
          matchingUser = null;
          _iterator2 = _createForOfIteratorHelper(users.recordset);
          _context12.prev = 11;
          _iterator2.s();
        case 13:
          if ((_step2 = _iterator2.n()).done) {
            _context12.next = 20;
            break;
          }
          user = _step2.value;
          if (!(user.pass == pass)) {
            _context12.next = 18;
            break;
          }
          matchingUser = user;
          return _context12.abrupt("break", 20);
        case 18:
          _context12.next = 13;
          break;
        case 20:
          _context12.next = 25;
          break;
        case 22:
          _context12.prev = 22;
          _context12.t0 = _context12["catch"](11);
          _iterator2.e(_context12.t0);
        case 25:
          _context12.prev = 25;
          _iterator2.f();
          return _context12.finish(25);
        case 28:
          if (matchingUser) {
            _context12.next = 30;
            break;
          }
          return _context12.abrupt("return", res.render('error', {
            error: 'Invalid password.'
          }));
        case 30:
          if (!(matchingUser.status !== 'inactive')) {
            _context12.next = 32;
            break;
          }
          return _context12.abrupt("return", res.render('error', {
            error: 'Ya estas registrado en un Aviso'
          }));
        case 32:
          _context12.prev = 32;
          _context12.next = 35;
          return _database.poolPC.request().input('id', _database.sql.Int, matchingUser.id).input('status', _database.sql.VarChar, 'active').query(_database.queries.updateUsers);
        case 35:
          _context12.next = 37;
          return _database.poolPC.request().input('id_user', _database.sql.Int, matchingUser.id).input('id_notice', _database.sql.Int, id_notice).input('starttime', _database.sql.DateTime, starttime).query(_database.queries.insertNoticeUser);
        case 37:
          console.log('Usuario agregado correctamente');
          res.redirect('/notices');
          _context12.next = 45;
          break;
        case 41:
          _context12.prev = 41;
          _context12.t1 = _context12["catch"](32);
          console.error('Error adding user to notice:', _context12.t1);
          res.status(500).json({
            error: 'Internal server error (addUser/notice update).'
          });
        case 45:
          _context12.next = 51;
          break;
        case 47:
          _context12.prev = 47;
          _context12.t2 = _context12["catch"](3);
          console.error('Unexpected error:', _context12.t2);
          res.status(500).json({
            error: 'Internal server error.'
          });
        case 51:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[3, 47], [11, 22, 25, 28], [32, 41]]);
  }));
  return function addUserNotice(_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}();
exports.addUserNotice = addUserNotice;
var exitUserNotice = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var _req$query, id_notices_user, id_notice, user_id, description, endtime;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _req$query = req.query, id_notices_user = _req$query.id_notices_user, id_notice = _req$query.id_notice, user_id = _req$query.user_id; //diferente
          description = req.body.description;
          endtime = new Date();
          console.log(id_notice, id_notices_user, user_id);
          console.log(description);
          _context13.prev = 5;
          _context13.next = 8;
          return _database.poolPC.request().input('id', _database.sql.Int, id_notices_user).input('id_user', _database.sql.Int, user_id).input('id_notice', _database.sql.Int, id_notice).input('endtime', _database.sql.DateTime, endtime).input('comment', _database.sql.Text, description).query(_database.queries.exitUserNotice);
        case 8:
          _context13.next = 10;
          return _database.poolPC.request().input('id', _database.sql.Int, user_id).input('status', _database.sql.VarChar, 'inactive').query(_database.queries.updateUsers);
        case 10:
          res.redirect("/noticesDetail/".concat(id_notice));
          _context13.next = 18;
          break;
        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](5);
          console.error(_context13.t0);
          res.status(500);
          res.send(_context13.t0.message);
        case 18:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[5, 13]]);
  }));
  return function exitUserNotice(_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();
exports.exitUserNotice = exitUserNotice;
var noticesDetail = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var id_notice, result, result1;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          id_notice = req.params.id_notice; //id_notice = parseInt(id_notice)
          console.log(id_notice);
          console.log((0, _typeof2["default"])(id_notice));
          _context14.prev = 3;
          _context14.next = 6;
          return _database.poolPC.request().input('id', _database.sql.Int, id_notice).query(_database.queries.getNoticeById);
        case 6:
          result = _context14.sent;
          _context14.next = 9;
          return _database.poolPC.request().input('id', _database.sql.Int, id_notice).query(_database.queries.getNoticeUserFilterById);
        case 9:
          result1 = _context14.sent;
          console.log(result.recordset);
          console.log(result1.recordset);
          res.render('noticesDetail', {
            notice: result.recordset,
            noticeUserFId: result1.recordset
          });
          _context14.next = 20;
          break;
        case 15:
          _context14.prev = 15;
          _context14.t0 = _context14["catch"](3);
          console.error(_context14.t0);
          res.status(500);
          res.send(_context14.t0.message);
        case 20:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[3, 15]]);
  }));
  return function noticesDetail(_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}();
exports.noticesDetail = noticesDetail;
var noticesHistory = [
//validacion
(0, _expressValidator.query)('machine').optional().isString().trim().escape(), (0, _expressValidator.query)('technician').optional().isString().trim().escape(), (0, _expressValidator.query)('startDate').optional({
  checkFalsy: true
}).isISO8601(), (0, _expressValidator.query)('endDate').optional({
  checkFalsy: true
}).isISO8601(), /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var errors, _req$query2, machine, message, technician, startDate, endDate, query, conditions, params, request, param, result, formattedStartDate, formattedEndDate;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          // Manejo de errores de validación
          errors = (0, _expressValidator.validationResult)(req);
          if (errors.isEmpty()) {
            _context15.next = 3;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 3:
          _req$query2 = req.query, machine = _req$query2.machine, message = _req$query2.message, technician = _req$query2.technician, startDate = _req$query2.startDate, endDate = _req$query2.endDate;
          query = _database.queries.getNoticesHistory;
          conditions = [];
          params = {};
          if (machine) {
            conditions.push('machine LIKE @machine');
            params.machine = "%".concat(machine, "%");
          }
          if (message) {
            conditions.push('message LIKE @message');
            params.message = "%".concat(message, "%");
          }
          if (technician) {
            conditions.push('technician LIKE @technician');
            params.technician = "%".concat(technician, "%");
          }
          if (startDate) {
            startDate = (0, _dateFns.parseISO)(startDate);
            conditions.push('starttime >= @startDate');
            params.startDate = startDate;
          }
          if (endDate) {
            endDate = (0, _dateFns.parseISO)(endDate);
            endDate = (0, _dateFns.addDays)(endDate, 1);
            conditions.push('endtime <= @endDate');
            params.endDate = endDate;
          }
          if (conditions.length > 0) {
            query += ' AND ' + conditions.join(' AND ');
            console.log(query);
          }
          /* if (conditions.length > 0) {
              query += ' WHERE status = 3 AND ' + conditions.join(' AND ');
              console.log(query);
          } */

          console.log(conditions);
          console.log(params);
          _context15.prev = 15;
          request = _database.poolPC.request();
          for (param in params) {
            request.input(param, params[param]);
            console.log(param, params[param]);
          }
          _context15.next = 20;
          return request.query(query);
        case 20:
          result = _context15.sent;
          // Formatear fechas para el formulario
          formattedStartDate = startDate ? (0, _dateFns.format)(startDate, 'yyyy-MM-dd') : '';
          formattedEndDate = endDate ? (0, _dateFns.format)(new Date(endDate), 'yyyy-MM-dd') : '';
          res.render('noticesHistory', {
            noticesHistory: result.recordset,
            machine: machine,
            message: message,
            technician: technician,
            startDate: formattedStartDate,
            endDate: formattedEndDate
          });
          _context15.next = 31;
          break;
        case 26:
          _context15.prev = 26;
          _context15.t0 = _context15["catch"](15);
          console.error(_context15.t0);
          res.status(500);
          res.send(_context15.t0.message);
        case 31:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[15, 26]]);
  }));
  return function (_x27, _x28) {
    return _ref15.apply(this, arguments);
  };
}()];

//NoticeUser-----------------------------------
exports.noticesHistory = noticesHistory;
var putNoticeUser = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var _req$body2, id_user, id_notice, starttime;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _req$body2 = req.body, id_user = _req$body2.id_user, id_notice = _req$body2.id_notice, starttime = _req$body2.starttime;
          _context16.next = 3;
          return _database.poolPC.transaction().begin();
        case 3:
          _context16.prev = 3;
          _context16.next = 6;
          return _database.poolPC.request().input('id_user', _database.sql.Int, id_user).input('id_notice', _database.sql.Int, id_notice).input('starttime', _database.sql.DateTime, starttime).query(_database.queries.insertNoticeUser);
        case 6:
          _context16.next = 8;
          return _database.poolPC.transaction().commit();
        case 8:
          console.log('NoticeUser insertado correctamente');
          _context16.next = 15;
          break;
        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16["catch"](3);
          console.error('Unexpected error:', _context16.t0);
          res.status(500).json({
            error: 'Internal server error.'
          });
        case 15:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[3, 11]]);
  }));
  return function putNoticeUser(_x29, _x30) {
    return _ref16.apply(this, arguments);
  };
}();
exports.putNoticeUser = putNoticeUser;
var noticesUser_User = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var id_notice, result, _noticesUser_User;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          id_notice = req.params.id_notice;
          console.log('el id notice es', id_notice);
          _context17.prev = 2;
          _context17.next = 5;
          return _database.poolPC.request().input('id_notice', _database.sql.Int, id_notice).query(_database.queries.getNoticesUser_UserId);
        case 5:
          result = _context17.sent;
          _noticesUser_User = result.recordset;
          res.status(200).json(_noticesUser_User);
          _context17.next = 14;
          break;
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](2);
          console.error(_context17.t0);
          res.status(500).json({
            message: 'Error noticesUser_User'
          });
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[2, 10]]);
  }));
  return function noticesUser_User(_x31, _x32) {
    return _ref17.apply(this, arguments);
  };
}();

//images--------------------------
exports.noticesUser_User = noticesUser_User;
var uploadImages = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var id_notice, _req$file, buffer, originalname, filename, resizedFilePath;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          /* const { filename, path: filePath } = req.file
          const resizedFilePath = `../uploads/resized_${filename}` */
          id_notice = req.body.id_notice;
          _req$file = req.file, buffer = _req$file.buffer, originalname = _req$file.originalname;
          filename = Date.now() + _path["default"].extname(originalname);
          resizedFilePath = _path["default"].join(__dirname, '../uploads', "resized_".concat(filename));
          console.log(resizedFilePath);
          _context18.prev = 5;
          _context18.next = 8;
          return (0, _sharp["default"])(buffer).resize(800, 600) // Ajusta el tamaño según tus necesidades
          .toFile(resizedFilePath);
        case 8:
          _context18.next = 10;
          return _database.poolPC.request().input('id_notice', _database.sql.Int, id_notice).input('imagename', _database.sql.VarChar, filename)
          //.input('equipment', sql.VarChar, resizedFilePath)
          //.input('comment', sql.VarChar, resizedFilePath)
          .query(_database.queries.uploadImages);
        case 10:
          console.log('Imagen subida y redimensionada exitosamente');
          res.redirect("/noticesDetail/".concat(id_notice));
          _context18.next = 18;
          break;
        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](5);
          console.error(_context18.t0);
          res.status(500).json({
            message: 'Error al subir la imagen'
          });
        case 18:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[5, 14]]);
  }));
  return function uploadImages(_x33, _x34) {
    return _ref18.apply(this, arguments);
  };
}();
exports.uploadImages = uploadImages;
var getImages = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var id_notice, result, images;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          id_notice = req.params.id_notice;
          _context19.prev = 1;
          _context19.next = 4;
          return _database.poolPC.request().input('id_notice', _database.sql.Int, id_notice).query(_database.queries.getImages);
        case 4:
          result = _context19.sent;
          images = result.recordset;
          res.status(200).json(images);
          _context19.next = 13;
          break;
        case 9:
          _context19.prev = 9;
          _context19.t0 = _context19["catch"](1);
          console.error(_context19.t0);
          res.status(500).json({
            message: 'Error al obtener las imágenes'
          });
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[1, 9]]);
  }));
  return function getImages(_x35, _x36) {
    return _ref19.apply(this, arguments);
  };
}();

/* Transaction-Based Updates:
Wrap the notice and user status updates within a transaction using poolPC.transaction().
This ensures that both updates happen atomically or not at all, maintaining data integrity in case of partial failures.
Use await poolPC.transaction().commit() to finalize successful updates and await poolPC.transaction().rollback() to revert changes in case of errors. */

/* export const acceptNotice = async (req, res) => {
    const {pass} = req.body
    const {id} = req.params
    const status = 2
    const starttime = new Date()
    console.log(pass.length); 
    try {
        console.log('prueba');
        const result = await poolPC
            .request()
            .query(queries.getUsers)


            console.log(result.recordset);
        let resultado = result.recordset

        resultado.forEach (element => {
            console.log(typeof(element.pass));
            console.log(typeof(pass));

            //if (pass.length===)
            if (element.pass == pass) {
                console.log('coincide');
                if (element.status != 'active') {
                    poolPC
                    .request()
                    .input('id', sql.Int, id)
                    .input('status', sql.Int, status)
                    .input('starttime', sql.DateTime, starttime)
                    .input('technician', sql.VarChar, element.name + ' ' +  element.lastname)
                    .query(queries.updateNotice)
    
                    poolPC
                    .request()
                    .input('id', sql.Int, element.id)
                    .input('status',sql.VarChar, 'active')
                    .query(queries.updateUsers) 
                }else{
                    
                }
                
            }else{
                console.log('nop');
            }
        });
        console.log('Aviso aceptado correctamente');        
        res.redirect('/notices')


    } catch (error) {
        console.error(error)
        res.status(500).send('Error interno del servidor')

    }


} */
exports.getImages = getImages;