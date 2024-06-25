"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connect = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var mqtt = _interopRequireWildcard(require("async-mqtt"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var mqttSettings = {
  host: '10.9.12.22',
  port: 1883
};

/*export function connectionMqtt() {
    try {
        const poolMqtt = mqtt.connect(mqttSettings)
        return poolMqtt
    } catch (error) {
        console.log(error)
    }
}*/

var clientMqtt = mqtt.connect(mqttSettings);
var connect = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("starting");
          _context.prev = 1;
          _context.next = 4;
          return clientMqtt.subscribe('he/corte2/hx3/t_turbina');
        case 4:
          console.log('Mqtt connected from mqtt to he/corte2/hx3/t_turbina');
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0.stack);
          //process.exit()
        case 10:
          _context.prev = 10;
          _context.next = 13;
          return clientMqtt.subscribe('he/corte2/hx5/v_head');
        case 13:
          console.log('Mqtt connected from mqtt to he/corte2/hx5/v_head');
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t1 = _context["catch"](10);
          console.log(_context.t1.stack);
        case 19:
          _context.prev = 19;
          _context.next = 22;
          return clientMqtt.subscribe('he/c2/hx3/status');
        case 22:
          console.log('Mqtt connected from mqtt to "he/c2/hx3/status"');
          _context.next = 28;
          break;
        case 25:
          _context.prev = 25;
          _context.t2 = _context["catch"](19);
          console.log(_context.t2.stack);
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7], [10, 16], [19, 25]]);
  }));
  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

/*clientMqtt.on('connect', connect)     

clientMqtt.on('message', async (topic, message) => {
    message = message.toString()
    console.log(message);
})*/
exports.connect = connect;
var _default = clientMqtt;
exports["default"] = _default;